import { Slider } from 'antd';
import styles from './YearSliderStyle.module.scss';

function YearSlider() {
  return (
    <div className={styles.multiFilterStyle}>
      <p>Year</p>
      <Slider
        className={styles.slideColor}
        min={1950}
        max={2024}
        defaultValue={1950}
      />
    </div>
  );
}

export default YearSlider;
