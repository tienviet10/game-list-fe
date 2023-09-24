import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { StatusUpdatesDTOResponse } from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';

export default function StatusUpdateActivity({
  statusUpdate,
  username,
}: {
  statusUpdate: StatusUpdatesDTOResponse;
  username: string;
}) {
  // const { handleAddFollow, contextHolder: handleFollowContextHolder } =
  //   useAddRemoveFollowCustomHook();

  const name =
    statusUpdate.userGame.user.username === username
      ? 'You'
      : statusUpdate.userGame.user.username;

  const verb = name === 'You' ? 'are' : 'is';

  const textGenerator = (statusUpdateInput: StatusUpdatesDTOResponse) => {
    switch (statusUpdateInput.gameStatus) {
      case 'Playing':
        return `${name} ${verb} playing `;
      case 'Completed':
      case 'Dropped':
      case 'Paused':
        return `${name} ${statusUpdateInput.gameStatus.toLowerCase()} `;
      case 'Planning':
        return `${name} ${verb} planning to play `;
      case 'Inactive':
        return `${name} removed `;
      case null:
        return `${name} just added `;
      default:
        return `${name} `;
    }
  };
  return (
    <div className={styles.activityInfo}>
      <a
        href={`/game-detail/${statusUpdate.userGame.game.id}/${statusUpdate.userGame.game.name}`}
        aria-label={`${statusUpdate.userGame.game.name}`}
        style={{
          textIndent: '-9999px',
          backgroundImage: `url(${statusUpdate.userGame.game.imageURL})`,
        }}
      >
        {statusUpdate.userGame.game.name}
      </a>
      <div className={styles.activityInfoText}>
        <div>
          {textGenerator(statusUpdate)}
          <a
            href={`/game-detail/${statusUpdate.userGame.game.id} / ${statusUpdate.userGame.game.name}`}
          >
            {statusUpdate.userGame.game.name}
          </a>{' '}
        </div>
        <Avatar
          style={{
            cursor: `${
              statusUpdate.userGame.user.username !== username
                ? 'pointer'
                : 'default'
            }`,
          }}
          src={statusUpdate.userGame.user.userPicture}
          icon={<UserOutlined />}
          onClick={async () => {
            if (
              statusUpdate.userGame.user.username &&
              statusUpdate.userGame.user.username !== username
            ) {
              // await handleAddFollow(statusUpdate);
              console.log('add follow');
            }
          }}
        />
      </div>
      {/* {handleFollowContextHolder} */}
    </div>
  );
}
