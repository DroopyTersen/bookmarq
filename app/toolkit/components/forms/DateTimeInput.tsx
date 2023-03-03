import dayjs from "dayjs";
import { useState } from "react";
import { Input, InputProps } from "./Input";

export type DateTimeInputProps = Omit<InputProps, "ref"> & {
  defaultValue: string | Date;
};
export const DateTimeInput = ({
  defaultValue = "",
  onChange,
  name,
  ...rest
}: DateTimeInputProps) => {
  let [initialValue] = useState(() =>
    defaultValue ? dayjs(defaultValue).format("YYYY-MM-DDTHH:mm") : ""
  );
  return (
    <>
      <Input
        type="datetime-local"
        defaultValue={initialValue}
        onChange={(e) => {
          let hiddenInput = e.currentTarget
            .nextElementSibling as HTMLInputElement;
          hiddenInput.value = e.currentTarget.value
            ? dayjs(e.currentTarget.value).format()
            : "";
        }}
        {...rest}
      />
      <input
        type="hidden"
        name={name}
        defaultValue={dayjs(initialValue).format()}
        onChange={onChange}
      />
    </>
  );
};
