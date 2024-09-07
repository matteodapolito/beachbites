import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlotSelectorProps {
  openingTime: string;
  closingTime: string;
  required: boolean;
  placeholder: string;
  field: any;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  openingTime,
  closingTime,
  required,
  placeholder,
  field,
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const [openingHour, openingMinute] = openingTime.split(":").map(Number);
    const [closingHour, closingMinute] = closingTime.split(":").map(Number);

    const openingDate = new Date(now);
    openingDate.setHours(openingHour, openingMinute, 0, 0);

    const closingDate = new Date(now);
    closingDate.setHours(closingHour, closingMinute, 0, 0);

    const currentDate = new Date(now);
    if (currentDate < openingDate) {
      currentDate.setHours(openingHour, openingMinute, 0, 0);
    } else {
      currentDate.setMinutes(
        Math.ceil(currentDate.getMinutes() / 15) * 15,
        0,
        0
      ); // Arrotonda ai prossimi 15 minuti
    }

    while (currentDate < closingDate) {
      slots.push(currentDate.toTimeString().substring(0, 5));
      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Select
      required={required}
      onValueChange={field.onChange}
      defaultValue={field.value.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {timeSlots.map((slot, index) => (
          <SelectItem key={index} value={slot}>
            {slot}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSlotSelector;
