/* eslint-disable react/jsx-props-no-spreading */
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import type {
  StatusContentType,
  StatusListType,
} from '@components/UserListFilterColumn/types';
import StatusItem from '@components/UserListFilterColumn/Desktop/StatusItem';
import { setLocalListOrder } from '@features/userGamesListSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { StrictModeDroppable } from './StrictModeDroppable';

const reorder = (
  list: StatusListType,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function ReorderLists() {
  const dispatch = useAppDispatch();
  const listState = useAppSelector((state) => state.userGames.localListOrder);

  const formattedListState = listState.map((item) => ({
    id: item,
    content: item[0].toUpperCase() + item.slice(1),
  }));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newStatusOrder = reorder(
      formattedListState,
      result.source.index,
      result.destination.index
    );

    dispatch(setLocalListOrder(newStatusOrder.map((item) => item.id)));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {formattedListState.map(
              (singleStatus: StatusContentType, index: number) => (
                <StatusItem
                  status={singleStatus}
                  index={index}
                  key={singleStatus.id}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default ReorderLists;
