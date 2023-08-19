import { Button as OgButton, Typography } from 'antd';
import { ButtonHTMLType, ButtonType } from 'antd/es/button';
import { BaseType } from 'antd/es/typography/Base';
import { useMemo } from 'react';
import styles from './Button.module.scss';

type Props = {
  text: string;
  textType?: BaseType;
  textStyle?: string;
  buttonType?: ButtonType;
  buttonStyle?: string;
  htmlType?: ButtonHTMLType;
  preset?: 'default' | 'primary' | 'secondary';
};

const { Text } = Typography;

function Button({
  text,
  textType,
  textStyle,
  buttonType,
  buttonStyle,
  htmlType,
  preset = 'default',
}: Props) {
  const presetStyles = useMemo(
    () => ({
      default: {
        button: '',
        text: '',
      },
      primary: {
        button: styles.primary,
        text: styles.primaryText,
      },
      secondary: {
        button: styles.secondary,
        text: styles.secondaryText,
      },
    }),
    []
  );

  return (
    <OgButton
      type={buttonType}
      htmlType={htmlType}
      className={`${presetStyles[preset].button} ${buttonStyle}`}
    >
      <Text
        type={textType}
        className={`${presetStyles[preset].text} ${textStyle}`}
      >
        {text}
      </Text>
    </OgButton>
  );
}

export default Button;
