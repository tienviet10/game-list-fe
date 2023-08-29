import { Select } from 'antd';

type Props = {
  title: string;
  selectedChoice?: number | string | undefined;
  optionsList?: Array<{ label: string | number; value: string | number }>;
  onPress?: (value: number | string) => void;
};

function CustomSelect({ title, selectedChoice, optionsList, onPress }: Props) {
  return (
    <Select
      data-testid={`dropdown-${title}`}
      value={selectedChoice}
      onChange={onPress}
      options={optionsList}
      placeholder={title}
      allowClear
    />
  );
}

export default CustomSelect;
