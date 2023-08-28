import type { OnChangeDatePickerType } from '@/types/global';

export type DatePickerFieldType = {
  defaultValue?: string | undefined;
  fieldName: string;
  onChange: (value: OnChangeDatePickerType, dateString: string) => void;
  customCascaderStyle: string;
};
