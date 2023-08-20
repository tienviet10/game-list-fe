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
};

function FormItem(prop: Props) {
  const { name, rules, inputStyle, ...rest } = prop;

  return (
    <Item name={name} rules={rules}>
      {name === 'password' ? (
        <Password {...rest} className={`${styles.input} ${inputStyle}`} />
      ) : (
        <Input {...rest} className={`${styles.input} ${inputStyle}`} />
      )}
    </Item>
  );
}

export default FormItem;
