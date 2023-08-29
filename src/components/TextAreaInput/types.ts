export type TextAreaInputType = {
  defaultValue?: string;
  fieldName: string;
  customCascaderStyle?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
};
