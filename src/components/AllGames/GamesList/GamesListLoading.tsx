import { Row, Skeleton } from 'antd';

export default function GamesListLoading() {
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        xl: 32,
      }}
    >
      <Skeleton.Button />
      <Skeleton.Button />
    </Row>
  );
}
