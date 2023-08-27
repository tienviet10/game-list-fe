import { Tag } from 'antd';
import styles from './CustomTag.module.scss';

type CustomTagProps = {
  text: string;
  overrideStyle?: string;
};

function CustomTag({ text, overrideStyle }: CustomTagProps) {
  return <Tag className={`${styles.TagStyle} ${overrideStyle}`}>{text}</Tag>;
}

export default CustomTag;
