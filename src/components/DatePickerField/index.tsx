import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import type { DatePickerFieldType } from '@/components/DatePickerField/types';
// import styles from '@/components/DatePickerField/DatePickerField.module.scss';

function DatePickerField({
  defaultValue,
  fieldName,
  onChange,
  customCascaderStyle,
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
