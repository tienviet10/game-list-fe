import { useQueryClient } from '@tanstack/react-query';

import type {
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
} from '@constants/types';

export type OldPostsAndStatusUpdatesDataType = {
  pageParams: number[];
  pages: PostsAndStatusUpdatesPageType[];
};

type PostsAndStatusUpdatesPageType = {
  data: PostsAndStatusUpdatesData;
};

type PostsAndStatusUpdatesData = {
  postsAndStatusUpdates: {
    lastPostOrStatusUpdateId: number;
    posts: PostsDTOResponse[];
    statusUpdates: StatusUpdatesDTOResponse[];
  };
};

const useUpdateInteractiveEntityCache = () => {
  const updatePostByPost = (
    oldData: OldPostsAndStatusUpdatesDataType | undefined,
    newPost: PostsDTOResponse
  ) => {
    if (!oldData) {
      return null;
    }
    const { pageParams, pages } = oldData;

    const firstPage = pages[0];

    console.log('firstPage', firstPage);

    const { posts } = firstPage.data.postsAndStatusUpdates;
    const newPosts = [newPost, ...posts];

    pages[0].data.postsAndStatusUpdates.posts = newPosts;

    // const newPages = pages.map((page) => {
    //   const { data } = page;
    //   const { data: postsAndStatusUpdatesData } = data;

    //   const { postsAndStatusUpdates } = postsAndStatusUpdatesData;
    //   const { posts } = postsAndStatusUpdates;

    //   const newPosts = posts.map((post) => {
    //     if (post.id === postId) {
    //       return {
    //         ...post,
    //         postLiked: isPostLiked,
    //         postCommented: isPostCommented,
    //         postDeleted: isPostDeleted,
    //       };
    //     }
    //     return post;
    //   });
    //   return {
    //     ...page,
    //     data: {
    //       data: {
    //         postsAndStatusUpdates: {
    //           ...postsAndStatusUpdates,
    //           posts: newPosts,
    //         },
    //       },
    //     },
    //   };
    // });

    return {
      pageParams,
      pages,
    };
  };

  const updateStatusUpdateById = (
    oldData: OldPostsAndStatusUpdatesDataType,
    statusUpdateId: number,
    isStatusUpdateLiked: boolean,
    isStatusUpdateCommented: boolean,
    isStatusUpdateDeleted: boolean
  ) => {
    const { pageParams, pages } = oldData;

    const newPages = pages.map((page) => {
      const { data } = page;
      const { postsAndStatusUpdates } = data;

      const { statusUpdates } = postsAndStatusUpdates;

      const newStatusUpdates = statusUpdates.map((statusUpdate) => {
        if (statusUpdate.id === statusUpdateId) {
          return {
            ...statusUpdate,
            statusUpdateLiked: isStatusUpdateLiked,
            statusUpdateCommented: isStatusUpdateCommented,
            statusUpdateDeleted: isStatusUpdateDeleted,
          };
        }
        return statusUpdate;
      });
      return {
        ...page,
        data: {
          data: {
            postsAndStatusUpdates: {
              ...postsAndStatusUpdates,
              statusUpdates: newStatusUpdates,
            },
          },
        },
      };
    });

    return {
      pageParams,
      pages: newPages,
    };
  };

  return { updatePostByPost, updateStatusUpdateById };
};

export default useUpdateInteractiveEntityCache;
