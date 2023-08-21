import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import styles from './FormItem.module.scss';

const { Item } = Form;
const { Password } = Input;

type Props<T extends object, K extends keyof T> = {
  name: K;
  rules?: Rule[];
  placeholder?: string;
  'data-testid'?: string;
  inputStyle?: string;
  itemContainerStyle?: string;
  autoComplete?: boolean;
};

/** This is use under \<Form> */
function FormItem<T extends object, K extends keyof T>(prop: Props<T, K>) {
  const {
    name: itemName,
    rules,
    itemContainerStyle,
    inputStyle,
    autoComplete,
    ...rest
  } = prop;

  const name = itemName as string;

  return (
    <Item name={name} rules={rules} className={`${itemContainerStyle}`}>
      {name.includes('password') ? (
        <Password {...rest} className={`${styles.input} ${inputStyle}`} />
      ) : (
        <Input
          {...rest}
          className={`${styles.input} ${inputStyle}`}
          autoComplete={autoComplete ? 'on' : 'off'}
        />
      )}
    </Item>
  );
}

export default FormItem;
