import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

const useGeoLocation = (): Location | null => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Errore nell'ottenere la posizione:", error);
        }
      );
    } else {
      console.error("Geolocation non supportata");
    }
  }, []);

  return location;
};

export default useGeoLocation;
