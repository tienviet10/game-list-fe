import { Avatar, Card, Row, Skeleton } from 'antd';

const { Meta } = Card;

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
      {' '}
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>{' '}
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>{' '}
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>{' '}
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>{' '}
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>{' '}
      <Card
        style={{
          width: 200,
          height: 300,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <Skeleton loading avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Skeleton>
      </Card>
    </Row>
  );
}
