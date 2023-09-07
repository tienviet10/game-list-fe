import { Popover, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type {
  GameDataType,
  UserGameListDataType,
} from '@components/GamesListTable/types';
import styles from '@components/GamesListTable/Desktop/UserGameListDesktop.module.scss';
import CustomTag from '@components/CustomTag';
import ListEditor from '@components/ListEditor';
import type { RequiredGameWithIsAdded } from '@constants/types';
import useGetUserGameState from '@services/usergames/useGetUserGameState';

function UserGameListDesktop({ data }: UserGameListDataType) {
  const [open, setOpen] = useState<boolean>(false);
  const [chosenGame, setChosenGame] = useState<
    RequiredGameWithIsAdded | undefined | GameDataType
  >();
  const { userGameDataIsLoading } = useGetUserGameState(chosenGame?.id);

  const handleClick = async (game: GameDataType) => {
    setChosenGame(game);
    setOpen(true);
  };

  const columns: ColumnsType<GameDataType> = [
    {
      title: '',
      dataIndex: 'imageURL',
      width: 80,
      render: (imageURL: string, record) => (
        <Popover
          placement="left"
          content={
            <img className={styles.ImagePop} src={imageURL} alt="game-large" />
          }
          className={styles.PopElement}
          overlayInnerStyle={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <button
            type="button"
            className={styles.popButton}
            onClick={() => handleClick(record)}
          >
            <img className={styles.Image} src={imageURL} alt="game" />
          </button>
        </Popover>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
      render: (name: string, record) => (
        <Link
          to={`/game-detail/${record.id}/${name}`}
          className={styles.nameContainer}
        >
          {name}
        </Link>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'avgScore',
      width: 100,
      sorter: {
        compare: (a, b) =>
          (a as { avgScore: number }).avgScore -
          (b as { avgScore: number }).avgScore,
        multiple: 3,
      },
    },
    {
      title: 'Platforms',
      dataIndex: 'platforms',
      width: 300,
      render: (platforms: string[]) => (
        <div className={styles.TagsContainer}>
          {platforms.map((platform: string) => (
            <CustomTag text={platform} key={platform} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table className={styles.Table} columns={columns} dataSource={data} />
      <ListEditor
        isGameAdded={chosenGame?.gameAdded}
        userGameLoading={userGameDataIsLoading}
        open={open}
        setOpen={setOpen}
        game={chosenGame as GameDataType}
        setSelectedGame={setChosenGame}
      />
    </>
  );
}

export default UserGameListDesktop;
