import { Modal, Button, Checkbox, Select } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useMemo } from 'react';

import type {
  DropDownOption,
  OnChangeCheckboxType,
  OnChangeDatePickerType,
  OnChangeTextAreaType,
} from '@constants/types';
import styles from '@components/ListEditor/ListEditor.module.scss';
import type { ListEditorType } from '@components/ListEditor/types';
// import useAddRemoveLike from '@services/like/useAddRemoveLike';
// import useRemoveModalHook from '@hooks/useRemoveModalHook';
// import { StatusType } from '@services/userGames/useAddDeleteGame';
// import useEditUserGame from '@services/userGames/useEditUserGame';
import useNotification from '@hooks/useNotification';
import { setUserGameReducer } from '@/features/userGameSlice';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import DatePickerField from '../DatePickerField';
import TextAreaInput from '../TextAreaInput';

function ListEditorTemp({
  isGameAdded,
  userGameLoading,
  open,
  setOpen,
  game,
  setSelectedGame,
}: ListEditorType) {
  const dispatch = useAppDispatch();
  const userGame = useAppSelector((state) => state.userGame);
  const userState = useAppSelector((state) => state.user);
  const { contextHolder, info, warning } = useNotification();

  const {
    gameStatus: selectedStatus,
    rating: selectedRating,
    gameNote: selectedNote,
    startDate: selectedStart,
    completedDate: selectedCompleted,
    private: selectedPrivate,
  } = userGame;

  // const { showRemoveConfirm, contextRemoveModal } = useRemoveModalHook(
  //   selectedStatus as StatusType
  // );

  // const { editUserGame } = useEditUserGame();
  // const { addLike, removeLike } = useAddRemoveLike();

  const statusOptions: DropDownOption[] = [
    { label: 'Playing', value: 'Playing' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Dropped', value: 'Dropped' },
    { label: 'Planning', value: 'Planning' },
  ];
  const scoreOptions: DropDownOption[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => index + 1).map((score) => ({
      label: score,
      value: score,
    }));
  }, []);

  if (userGameLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      className={styles.listEditorContainer}
      wrapClassName={styles.listEditor}
      zIndex={1040}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <div
        className={styles.listEditorHeader}
        style={{ backgroundImage: `url(${game?.bannerURL})` }}
      >
        <div className={styles.headerContent}>
          <div className={styles.contentCover}>
            {game?.imageURL ? (
              <img src={game?.imageURL} alt={game?.name} />
            ) : null}
          </div>
          <div className={styles.contentTitle}>{game?.name}</div>
          <div className={styles.contentFavourite}>
            <Button
              className={styles.favouriteButton}
              onClick={async () => {
                // if (userState?.user.id === '') {
                //   warning('Please login to add or edit your GameList');
                //   return;
                // }
                // if (!game?.isGameLiked) {
                //   const response = await addLike(
                //     game.id,
                //     game.__typename as string
                //   );
                //   setSelectedGame(response.like?.likeable as GameType);
                //   info(`You added ${game?.name} in your favorites list. `);
                // } else {
                //   const response = await removeLike(
                //     game?.id,
                //     game.__typename as string
                //   );
                //   setSelectedGame(response.like?.likeable as GameType);
                //   warning(`You removed ${game?.name} in your favorites list. `);
                // }
              }}
              icon={
                game?.isGameLiked ? (
                  <HeartFilled style={{ color: 'hotpink' }} />
                ) : (
                  <HeartOutlined />
                )
              }
            />
          </div>
          <div className={styles.contentSave}>
            <Button
              type="primary"
              onClick={async () => {
                // if (userState?.user.id === '') {
                //   warning('Please login to add or edit your GameList');
                //   return;
                // }
                // const { id, ...newUserGame } = userGame;
                // const response = await editUserGame({
                //   ...newUserGame,
                //   gameId: game.id,
                // });
                // setSelectedGame(response.userGame?.game as GameType);
                // info(`Edit game ${game.name} successfully`);
                // setOpen(false);
              }}
              className={styles.saveButton}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.listEditorBody}>
        <div className={styles.bodyInput}>
          <div style={{ gridArea: 'status' }}>
            <div>
              <h3>Status</h3>
              <Select
                data-testid="dropdown-Status"
                value={selectedStatus || undefined}
                onChange={(value: string): void => {
                  dispatch(
                    setUserGameReducer({ type: 'gameStatus', payload: value })
                  );
                }}
                options={statusOptions}
                placeholder="Status"
                allowClear
              />
            </div>
          </div>
          <div style={{ gridArea: 'score' }}>
            <div>
              <h3>Score</h3>
              <Select
                data-testid="dropdown-Score"
                value={selectedRating || undefined}
                onChange={(value: number): void => {
                  dispatch(
                    setUserGameReducer({
                      type: 'rating',
                      payload: value,
                    })
                  );
                }}
                options={scoreOptions}
                placeholder="Score"
                allowClear
              />
            </div>
          </div>
          <div style={{ gridArea: 'start' }}>
            <div>
              <h3>Start</h3>
              <DatePickerField
                defaultValue={selectedStart || undefined}
                onChange={(value: OnChangeDatePickerType) => {
                  dispatch(
                    setUserGameReducer({
                      type: 'startDate',
                      payload: value?.toISOString(),
                    })
                  );
                }}
                fieldName="Start"
                customCascaderStyle={styles.cascaderStyle}
              />
            </div>
          </div>
          <div style={{ gridArea: 'finish' }}>
            <div>
              <h3>Finish</h3>
              <DatePickerField
                defaultValue={selectedCompleted || undefined}
                fieldName="Finish"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeDatePickerType) => {
                  dispatch(
                    setUserGameReducer({
                      type: 'completedDate',
                      payload: value?.toISOString(),
                    })
                  );
                }}
              />
            </div>
          </div>
          <div style={{ gridArea: 'notes' }}>
            <div>
              <h3>Notes</h3>
              <TextAreaInput
                defaultValue={selectedNote || undefined}
                fieldName="Notes"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeTextAreaType) => {
                  dispatch(
                    setUserGameReducer({
                      type: 'gameNote',
                      payload: value.target.value,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.bodyCheckbox}>
          <div className={styles.checkboxList}>
            <div>Custom Lists</div>
            <span>No custom game lists</span>
          </div>
          <Checkbox
            checked={selectedPrivate || false}
            onChange={(e: OnChangeCheckboxType) => {
              dispatch(
                setUserGameReducer({
                  type: 'private',
                  payload: e.target.checked,
                })
              );
            }}
          >
            Private
          </Checkbox>
          {isGameAdded && (
            <Button
              type="dashed"
              onClick={() => {
                // showRemoveConfirm(game, 'game', setOpen);
                setSelectedGame({ ...game, isGameAdded: false });
              }}
            >
              Delete
            </Button>
          )}
          {/* {contextRemoveModal} */}
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}

const ListEditor = React.memo(ListEditorTemp);

export default ListEditor;
