import { useEffect, useRef, memo } from 'react';
import { Button } from 'antd';

import { CustomButton } from '@components/CustomButton';
import styles from '@components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';
import { usePosts } from '@services/post/usePosts';
import useNotification from '@/hooks/useNotification';

type PostInputProps = {
  comment?: string;
  setComment?: React.Dispatch<React.SetStateAction<string>>;
  commentType?: string;
  commentId?: string;
  setPost?: React.Dispatch<React.SetStateAction<string>>;
  post?: string;
};

function PostInput({
  post,
  setPost,
  comment,
  setComment,
  commentType,
  commentId,
}: PostInputProps) {
  const postRef = useRef<HTMLTextAreaElement>(null);

  const { success, contextHolder, warning } = useNotification();

  useEffect(() => {
    if (setPost) {
      postRef.current?.focus();
    }
  }, [setPost]);

  return (
    <div className={styles.postInputContainer}>
      <textarea
        value={setPost ? post : comment}
        autoComplete="off"
        placeholder={`${setPost ? 'Post' : 'Comment'} something...`}
        className={styles.postTextarea}
        onChange={(e) => {
          if (setComment) {
            setComment(e.target.value);
          } else if (setPost) {
            setPost(e.target.value);
          }
        }}
      />
      <div className={styles.postConfirmContainer}>
        <Button
          onClick={() => {
            if (setComment) {
              setComment('');
            } else if (setPost) {
              setPost('');
            }
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            // if (setPost && createPost && post) {
            //   const response = await createPost(post);
            //   if (response?.post && response?.errors?.length === 0) {
            //     success(`You have posted successfully.`);
            //     setPost('');
            //   } else {
            //     warning(`Can not post. ${response.errors}!`);
            //   }
            // } else if (setComment && comment && commentId && commentType) {
            //   const response = await addComment(
            //     commentId,
            //     commentType,
            //     comment
            //   );
            //   if (response?.comment && response?.errors?.length === 0) {
            //     success(`Your comment about has been posted successfully.`);
            //   } else {
            //     warning(`Can not post comment. ${response.errors}!`);
            //   }
            //   setComment('');
            // }
            setPost ? setPost('') : setComment('');
          }}
        >
          {setPost ? 'Post' : 'Comment'}
        </Button>
      </div>
      {contextHolder}
    </div>
  );
}

const MemoizedPostInput = memo(PostInput);

export default MemoizedPostInput;
