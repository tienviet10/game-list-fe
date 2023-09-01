import { Modal, Checkbox } from 'antd';
import { HeartOutlined, HeartFilled, CloseOutlined } from '@ant-design/icons';
import React from 'react';

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
import useNotification from '@hooks/useNotification';
import CustomButton from '@components/CustomButton';
import CustomSelect from '@components/CustomSelect';
import useEditUserGame from '@services/usergames/useEditUserGame';
import { setUserGameReducer } from '@features/userGameSlice';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import DatePickerField from '../DatePickerField';
import TextAreaInput from '../TextAreaInput';
import FieldSection from './FieldSection';

type ChoicesType =
  | {
      type: 'gameStatus';
      payload: string;
    }
  | {
      type: 'rating';
      payload: number;
    }
  | {
      type: 'startDate';
      payload: string;
    }
  | {
      type: 'completedDate';
      payload: string;
    }
  | {
      type: 'gameNote';
      payload: string;
    }
  | {
      type: 'private';
      payload: boolean;
    };

const statusOptions: DropDownOption[] = [
  { label: 'Playing', value: 'Playing' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Paused', value: 'Paused' },
  { label: 'Dropped', value: 'Dropped' },
  { label: 'Planning', value: 'Planning' },
];

const scoreOptions: DropDownOption[] = Array.from(
  { length: 10 },
  (_, index) => index + 1
).map((score) => ({
  label: score,
  value: score,
}));

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

  const { editUserGame } = useEditUserGame();
  // const { addLike, removeLike } = useAddRemoveLike();

  if (userGameLoading) {
    return <div>Loading...</div>;
  }

  const onPressFavorite = async () => {
    if (userState?.user.id === '') {
      warning('Please login to add or edit your GameList');
      return;
    }
    if (!game?.isGameLiked) {
      // const response = await addLike(
      //   game.id,
      //   game.__typename as string
      // );
      // setSelectedGame(response.like?.likeable as GameType);
      info(`You added ${game?.name} in your favorites list. `);
    } else {
      // const response = await removeLike(
      //   game?.id,
      //   game.__typename as string
      // );
      // setSelectedGame(response.like?.likeable as GameType);
      warning(`You removed ${game?.name} in your favorites list. `);
    }
  };

  const onPressSave = async () => {
    if (userState?.user.id === '') {
      warning('Please login to add or edit your GameList');
      return;
    }
    const { id, private: isPrivate, ...newUserGame } = userGame;
    editUserGame({
      ...newUserGame,
      isPrivate,
      gameId: game.id,
    });
    // setSelectedGame(userGameResponseData?.data.data as GameType);
    info(`Edit game ${game.name} successfully`);
    setOpen(false);
  };

  const onPressDelete = () => {
    // showRemoveConfirm(game, 'game', setOpen);
    setSelectedGame({ ...game, isGameAdded: false });
  };

  const handleChoicesChange = <Type extends ChoicesType['type']>(
    type: Type,
    payload: Extract<ChoicesType, { type: Type }>['payload']
  ) => {
    switch (type) {
      case 'gameStatus':
        dispatch(setUserGameReducer({ type: 'gameStatus', payload }));
        break;
      case 'rating':
        dispatch(setUserGameReducer({ type: 'rating', payload }));
        break;
      case 'startDate':
        dispatch(setUserGameReducer({ type: 'startDate', payload }));
        break;
      case 'completedDate':
        dispatch(setUserGameReducer({ type: 'completedDate', payload }));
        break;
      case 'gameNote':
        dispatch(setUserGameReducer({ type: 'gameNote', payload }));
        break;
      case 'private':
        dispatch(setUserGameReducer({ type: 'private', payload }));
        break;
      default:
        break;
    }
  };

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
      closeIcon={<CloseOutlined style={{ color: 'white' }} />}
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
            <CustomButton
              icon={
                game?.isGameLiked ? (
                  <HeartFilled style={{ color: 'hotpink' }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onPress={onPressFavorite}
            />
          </div>
          <div className={styles.contentSave}>
            <CustomButton text="Save" onPress={onPressSave} />
          </div>
        </div>
      </div>
      <div className={styles.listEditorBody}>
        <div className={styles.bodyInput}>
          <FieldSection
            title="status"
            field={
              <CustomSelect
                title="Status"
                optionsList={statusOptions}
                selectedChoice={selectedStatus}
                onPress={(value) =>
                  handleChoicesChange('gameStatus', value as string)
                }
              />
            }
          />
          <FieldSection
            title="score"
            field={
              <CustomSelect
                title="Score"
                optionsList={scoreOptions}
                selectedChoice={selectedRating}
                onPress={(value) =>
                  handleChoicesChange('rating', value as number)
                }
              />
            }
          />
          <FieldSection
            title="start"
            field={
              <DatePickerField
                defaultValue={selectedStart}
                fieldName="Start"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeDatePickerType) =>
                  handleChoicesChange('startDate', value?.toISOString() || '')
                }
              />
            }
          />
          <FieldSection
            title="finish"
            field={
              <DatePickerField
                defaultValue={selectedCompleted}
                fieldName="Finish"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeDatePickerType) =>
                  handleChoicesChange(
                    'completedDate',
                    value?.toISOString() || ''
                  )
                }
              />
            }
          />
          <FieldSection
            title="notes"
            field={
              <TextAreaInput
                defaultValue={selectedNote}
                fieldName="Notes"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeTextAreaType) =>
                  handleChoicesChange('gameNote', value.target.value)
                }
                minRows={2}
              />
            }
          />
        </div>
        <div className={styles.bodyCheckbox}>
          <div className={styles.checkboxList}>
            <div>Custom Lists</div>
            <span>No custom game lists</span>
          </div>
          <Checkbox
            checked={selectedPrivate || false}
            onChange={(e: OnChangeCheckboxType) =>
              handleChoicesChange('private', e.target.checked)
            }
          >
            Private
          </Checkbox>
          {isGameAdded && (
            <CustomButton
              text="Delete"
              buttonType="dashed"
              onPress={onPressDelete}
            />
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
