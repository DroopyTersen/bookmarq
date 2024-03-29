import { forwardRef, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDebouncedEffect } from "~/hooks/useDebounce";
import { useHydrated } from "~/hooks/useHydrated";
import { pickerStyles } from "./Picker.styles";
import { PickerOption, PickerSingleProps } from "./Picker.types";
import { useAutocompleteOptions } from "./useAutocompleteOptions";

const parseSelectedOption = (value: string, options?: PickerOption[]) => {
  if (!value) return null;

  return options?.find((o) => o.value === value) || { value, label: value };
};

export const PickerSingle = forwardRef<any, PickerSingleProps>(
  function PickerSingle(
    {
      initialValue,
      creatable,
      onChange,
      selectProps,
      options: optionsOrGetOptions,
      ...rest
    },
    ref
  ) {
    let isHydrated = useHydrated();
    let SelectComponent = creatable === true ? CreatableSelect : Select;
    let [selectedOption, setSelectedOption] = useState(() =>
      parseSelectedOption(initialValue, optionsOrGetOptions as any[])
    );
    let [inputValue, setInputValue] = useState(selectedOption?.label || "");
    let [options, { isLoading }] = useAutocompleteOptions(
      inputValue,
      optionsOrGetOptions
    );

    useDebouncedEffect(
      () => {
        onChange(selectedOption?.value || "", selectedOption);
      },
      selectedOption,
      100
    );

    let optionsToShow =
      options?.length > 0 ? options : selectedOption ? [selectedOption] : [];

    if (!isHydrated) return null;
    return (
      <SelectComponent
        ref={ref}
        styles={pickerStyles}
        {...rest}
        isLoading={isLoading}
        {...selectProps}
        classNamePrefix="dotadda-picker"
        onInputChange={(val) => {
          setInputValue(val);
        }}
        // If they pass a 'getOptions' function we'll assume that is responsible for filtering
        // the options. If they pass an array of options we'll leverage the default filtering
        filterOption={
          typeof optionsOrGetOptions === "function" ? () => true : undefined
        }
        defaultValue={selectedOption}
        onChange={(option: PickerOption) => {
          setSelectedOption(option);
        }}
        options={optionsToShow}
      />
    );
  }
);

export default PickerSingle;
