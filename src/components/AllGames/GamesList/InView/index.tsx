import { InView as ReactIntersectionInView } from 'react-intersection-observer';

type InViewProps = {
  onChange: () => void;
};

export default function InView({ onChange }: InViewProps) {
  return (
    <ReactIntersectionInView
      style={{ visibility: 'hidden' }}
      onChange={async (inView) => {
        if (inView) {
          await onChange();
        }
      }}
    />
  );
}
