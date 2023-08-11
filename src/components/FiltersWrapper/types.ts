import type {
  ArrayElementType,
  DropDownOption,
  OnChangeCascaderType,
} from '@/types/global';

export interface FilterFieldProps {
  defaultValue?: string | undefined;
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType, fieldName: string) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}

export type ExclusionFiltersListProps = {
  title: string;
  entries: string[];
  onChange: (included: string[], excluded: string[]) => void;
};

export type SelectFilterFieldType<T> =
  | {
      mode: 'multiple';
      value: T | undefined;
      options: string[] | number[];
      onChange?: (value: ArrayElementType<T>) => void;
      onSelect?: (value: ArrayElementType<T>) => void;
      onDeselect?: (value: ArrayElementType<T>) => void;
      onClear?: () => void;
    }
  | {
      mode: undefined;
      value: T | undefined;
      options: string[] | number[];
      onSelect?: (value: T) => void;
      onDeselect?: (value: T) => void;
      onChange?: (value: T) => void;
      onClear?: () => void;
    };
