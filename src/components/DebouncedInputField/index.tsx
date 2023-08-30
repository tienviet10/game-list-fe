/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Input, InputProps } from 'antd';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type DebouncedInputFieldProps = InputProps & {
  delay: number;
  onDebounceChange: (newValue) => void;
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

  const onInputChange = (e) => {
    onChange?.(e); // Call the original onChange
    debounced(e.target.value);
  };

  return <Input {...props} className={className} onChange={onInputChange} />;
}
