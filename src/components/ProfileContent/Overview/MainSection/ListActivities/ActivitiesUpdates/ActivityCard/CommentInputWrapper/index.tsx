import { useState } from 'react';

import MemoizedPostInput from '@components/ProfileContent/Overview/MainSection/ListActivities/PostInput';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';

function CommentInputWrapper({
  commentType,
  commentId,
}: {
  commentType: string;
  commentId: number;
}) {
  const [comment, setComment] = useState<string>('');
  return (
    <div>
      <MemoizedPostInput
        comment={comment}
        setComment={setComment}
        commentType={commentType}
        commentId={commentId}
      />
    </div>
  );
}

export default CommentInputWrapper;
