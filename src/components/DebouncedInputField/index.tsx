import { Input, InputProps } from 'antd';
import { useState, ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type DebouncedInputFieldProps = InputProps & {
  delay: number;
  onDebounceChange: (newValue: string | number) => void;
  // value: InputProps['value'];
};

// TODO: This only works for strings (input fields), but should also work for other fields (numbers, select)

export default function DebouncedSelectField({
  className,
  onChange,
  delay,
  onDebounceChange,
  ...props
}: DebouncedInputFieldProps) {
  const [lastDebouncedValue, setLastDebouncedValue] = useState();

  const debounced = useDebouncedCallback(
    (newValue) => {
      // Don't call onDebounceChange if the value hasn't changed
      if (lastDebouncedValue === newValue) {
        return;
      }

      onDebounceChange(newValue);
      setLastDebouncedValue(newValue);
    },
    // delay in ms
    delay
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e); // Call the original onChange
    debounced(e.target.value);
  };

  return <Input {...props} className={className} onChange={onInputChange} />;
}
