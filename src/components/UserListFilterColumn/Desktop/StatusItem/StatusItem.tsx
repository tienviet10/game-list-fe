/* eslint-disable react/jsx-props-no-spreading */
import { Draggable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';
import type { StatusItemType } from '@components/UserListFilterColumn/Desktop/types';
import styles from './StatusItemStyle.module.scss';

function StatusItem({ status, index }: StatusItemType) {
  return (
    <Draggable draggableId={status.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.statusItem}
          data-testid="status-item"
        >
          <p>{status.content}</p>
          <DragOutlined />
        </div>
      )}
    </Draggable>
  );
}

export default StatusItem;
