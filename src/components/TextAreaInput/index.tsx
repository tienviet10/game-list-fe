import { Input } from 'antd';
import type { TextAreaInputType } from '@/components/TextAreaInput/types';

function TextAreaInput({
  defaultValue,
  fieldName,
  customCascaderStyle = '',
  onChange,
  minRows,
  maxRows,
  maxLength = 100,
}: TextAreaInputType) {
  const { TextArea } = Input;
  return (
    <TextArea
      value={defaultValue}
      showCount
      maxLength={maxLength}
      onChange={(e) => onChange(e)}
      placeholder={fieldName}
      className={customCascaderStyle}
      data-testid={`text-area-${fieldName}`}
      autoSize={{ minRows, maxRows }}
    />
  );
}

export default TextAreaInput;
