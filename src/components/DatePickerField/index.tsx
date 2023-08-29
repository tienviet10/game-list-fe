import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerFieldType } from '@/components/DatePickerField/types';

function DatePickerField({
  defaultValue,
  fieldName,
  onChange,
  customCascaderStyle = '',
}: DatePickerFieldType) {
  return (
    <DatePicker
      value={defaultValue ? dayjs(defaultValue) : undefined}
      className={customCascaderStyle}
      placeholder={fieldName}
      onChange={onChange}
      data-testid={`date-picker-${fieldName}`}
    />
  );
}

export default DatePickerField;
