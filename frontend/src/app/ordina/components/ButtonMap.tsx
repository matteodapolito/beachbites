import { useState, useEffect } from "react";
import useGeoLocation from "./useGeoLocation";
import MapComponent from "@/app/ordina/components/Maps";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaBinoculars } from "react-icons/fa";
import { OrdersActions } from "../utils";
import { UserSettings } from "@/app/constants/constants";

const ButtonWithMap: React.FC<{
  setIsOrderEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOrderEnabled }) => {
  const location = useGeoLocation();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const { getUserSettings } = OrdersActions();
  const [userSettings, setUserSettings] = useState<UserSettings>();
  const [points, setPoints] = useState<{ lat: number; lng: number }[]>([]);

  function checkEnable(
    location: any,
    gps_coordinates: { lat: number; lng: number }[]
  ) {
    return (
      location.lat >= Math.min(...gps_coordinates.map((point) => point.lat)) &&
      location.lat <= Math.max(...gps_coordinates.map((point) => point.lat)) &&
      location.lng >= Math.min(...gps_coordinates.map((point) => point.lng)) &&
      location.lng <= Math.max(...gps_coordinates.map((point) => point.lng))
    );
  }

  useEffect(() => {
    getUserSettings()
      .json()
      .then((userSettingsData) => {
        const userData = userSettingsData as UserSettings;
        setUserSettings(userData);
        setPoints(userData.gps_coordinates);

        if (location) {
          console.log(checkEnable(location, userData.gps_coordinates));

          setIsEnabled(checkEnable(location, userData.gps_coordinates));

          if (setIsOrderEnabled) {
            setIsOrderEnabled(checkEnable(location, userData.gps_coordinates));
          }
        }
      });
  }, [location]);

  return (
    <div className="flex flex-col gap-y-5">
      {isEnabled ? (
        location &&
        points && (
          <MapComponent
            position={location}
            points={userSettings?.gps_coordinates || []}
          />
        )
      ) : (
        <Alert className="mt-10 text-left bg-red-300	">
          <FaBinoculars className="h-4 w-4" />
          <AlertTitle>Non ti vediamo!</AlertTitle>
          <AlertDescription>
            È possibile utilizzare il servizio di concierge solo ed
            esclusivamente se presenti fisicamente nel nostro stabilimento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ButtonWithMap;
