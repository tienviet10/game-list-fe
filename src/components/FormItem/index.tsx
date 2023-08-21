import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import styles from './FormItem.module.scss';

const { Item } = Form;
const { Password } = Input;

type Props = {
  name: string;
  rules?: Rule[];
  placeholder?: string;
  'data-testid'?: string;
  inputStyle?: string;
  itemContainerStyle?: string;
  autoComplete?: boolean;
};

function FormItem(prop: Props) {
  const { name, rules, itemContainerStyle, inputStyle, autoComplete, ...rest } =
    prop;

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
