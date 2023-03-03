import { forwardRef } from "react";
import { DateTimeInput } from "../date-time/DateTimeInput";
import { DateTimeInputProps } from "./DateTimeInput";
import { FormField, FormFieldProps, pluckFormFieldProps } from "./FormField";

export const DateTimeInputField = forwardRef<HTMLInputElement, DateTimeInputFieldProps>(
  // eslint-disable-next-line
  function DateTimeInputField(props, ref) {
    const { formControlProps, formFieldProps } = pluckFormFieldProps(props);
    return (
      <FormField {...formFieldProps}>
        <DateTimeInput required={formFieldProps.required} {...formControlProps} ref={ref} />
      </FormField>
    );
  }
);

export type DateTimeInputFieldProps = Partial<DateTimeInputProps> & FormFieldProps;
