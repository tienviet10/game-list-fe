import { useEffect, useRef, memo } from 'react';

import CustomButton from '@components/CustomButton';
import styles from '@components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';
import { usePosts } from '@services/post/usePosts';
import useNotification from '@/hooks/useNotification';

type PostInputProps = {
  comment?: string;
  setComment?: React.Dispatch<React.SetStateAction<string>>;
  commentType?: string;
  commentId?: number;
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

  const { createPostMutation } = usePosts();

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
        <CustomButton
          text="Cancel"
          buttonType="default"
          textType="secondary"
          onPress={() => {
            if (setComment) {
              setComment('');
            } else if (setPost) {
              setPost('');
            }
          }}
        />
        <CustomButton
          buttonType="primary"
          text={setPost ? 'Post' : 'Comment'}
          onPress={async () => {
            if (setPost && createPostMutation && post) {
              createPostMutation(
                { text: post },
                {
                  onSuccess: () => {
                    success(`You have posted successfully.`);
                    setPost('');
                  },
                  onError: (error) => {
                    warning(`Can not post. ${error.message}!`);
                  },
                }
              );
            } else if (setComment && comment && commentId && commentType) {
              // const response = await addComment(
              //   commentId,
              //   commentType,
              //   comment
              // );
              // if (response?.comment && response?.errors?.length === 0) {
              //   success(`Your comment about has been posted successfully.`);
              // } else {
              //   warning(`Can not post comment. ${response.errors}!`);
              // }
              setComment('');
            } else if (setPost && !post) {
              warning(`Please write something to post.`);
            }
          }}
        />
      </div>
      {contextHolder}
    </div>
  );
}

const MemoizedPostInput = memo(PostInput);

export default MemoizedPostInput;
