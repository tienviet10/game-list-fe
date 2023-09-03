import styles from './CustomSocialTab.module.scss';

type Props = {
  text: string;
  onPress?: () => void;
  activeStyle?: string;
};

function CustomSocialTab({ text, onPress, activeStyle }: Props) {
  return (
    <span
      onClick={onPress}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onPress) {
          onPress();
        }
      }}
      role="button"
      tabIndex={0}
      className={`${styles.link} ${activeStyle}`}
    >
      {text}
    </span>
  );
}

export default CustomSocialTab;
