import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UmbrellaSelectorProps {
  maxUmbrellas: number;
  required: boolean;
  placeholder: string;
  field: any;
}

const UmbrellaSelector: React.FC<UmbrellaSelectorProps> = ({
  maxUmbrellas,
  required,
  placeholder,
  field,
}) => {
  const generateUmbrellaOptions = () => {
    const options = [];
    for (let i = 1; i <= maxUmbrellas; i++) {
      options.push(i);
    }
    return options;
  };

  const umbrellaOptions = generateUmbrellaOptions();

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
        {umbrellaOptions.map((number) => (
          <SelectItem key={number} value={number.toString()}>
            {number}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UmbrellaSelector;
