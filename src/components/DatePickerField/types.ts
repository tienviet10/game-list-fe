import { OnChangeDatePickerType } from '@constants/types';

export type DatePickerFieldType = {
  defaultValue?: string | undefined;
  fieldName: string;
  onChange: (value: OnChangeDatePickerType, dateString: string) => void;
  customCascaderStyle?: string;
};
