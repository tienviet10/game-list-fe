import { Button, Typography } from 'antd';
import { ButtonHTMLType, ButtonType } from 'antd/es/button';
import { BaseType } from 'antd/es/typography/Base';
import { useMemo, useRef } from 'react';
import styles from './Button.module.scss';

type TextSizeWeight =
  | 'bookSm'
  | 'bookMd'
  | 'bookLg'
  | 'bookXl'
  | 'bookXxl'
  | 'bookXxxl'
  | 'mediumSm'
  | 'mediumMd'
  | 'mediumLg'
  | 'mediumXl'
  | 'mediumXxl'
  | 'mediumXxxl'
  | 'boldSm'
  | 'boldMd'
  | 'boldLg'
  | 'boldXl'
  | 'boldXxl'
  | 'boldXxxl';

type Props = {
  text?: string;
  textType?: BaseType;
  textSize?: TextSizeWeight;
  textStyle?: string;
  buttonType?: ButtonType;
  buttonStyle?: string;
  htmlType?: ButtonHTMLType;
  preset?: 'default';
  onPress?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

const { Text } = Typography;

/** This button uses \<Button> and \<Text> in \<Typography> from Ant Design */
function CustomButton({
  text,
  textType,
  textStyle,
  buttonType = 'primary',
  buttonStyle,
  htmlType,
  textSize,
  preset = 'default',
  onPress = () => {},
  children,
  icon,
}: Props) {
  const presetStyles = useMemo(
    () => ({
      default: {
        button: styles.defaultButton,
        text: styles.defaultTextWhite,
      },
    }),
    []
  );

  const buttonRef = useRef(null);

  const textSizes = useMemo(() => {
    switch (textSize) {
      case 'bookSm':
        return styles.bookSm;
      case 'bookMd':
        return styles.bookMd;
      case 'bookLg':
        return styles.bookLg;
      case 'bookXl':
        return styles.bookXl;
      case 'bookXxl':
        return styles.bookXxl;
      case 'bookXxxl':
        return styles.bookXxxl;
      case 'mediumSm':
        return styles.mediumSm;
      case 'mediumMd':
        return styles.mediumMd;
      case 'mediumLg':
        return styles.mediumLg;
      case 'mediumXl':
        return styles.mediumXl;
      case 'mediumXxl':
        return styles.mediumXxl;
      case 'mediumXxxl':
        return styles.mediumXxxl;
      case 'boldSm':
        return styles.boldSm;
      case 'boldMd':
        return styles.boldMd;
      case 'boldLg':
        return styles.boldLg;
      case 'boldXl':
        return styles.boldXl;
      case 'boldXxl':
        return styles.boldXxl;
      case 'boldXxxl':
        return styles.boldXxxl;
      default:
        return '';
    }
  }, [textSize]);

  return (
    <Button
      type={buttonType}
      htmlType={htmlType}
      className={`${presetStyles[preset].button} ${buttonStyle}`}
      onClick={onPress}
      icon={icon}
      ref={buttonRef}
    >
      {text ? (
        <Text
          type={textType}
          className={`${presetStyles[preset].text} ${textSizes} ${textStyle}`}
        >
          {text}
        </Text>
      ) : (
        children
      )}
    </Button>
  );
}

export default CustomButton;
