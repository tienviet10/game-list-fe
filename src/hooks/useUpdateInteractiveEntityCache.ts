import { useQueryClient } from '@tanstack/react-query';

import type {
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
} from '@services/InteractiveEntity/usePostsAndStatusUpdates';

export type OldPostsAndStatusUpdatesDataType = {
  pageParams: number[];
  pages: PostsAndStatusUpdatesPageType[];
};

type PostsAndStatusUpdatesPageType = {
  data: { data: PostsAndStatusUpdatesData };
};

type PostsAndStatusUpdatesData = {
  postsAndStatusUpdates: {
    lastPostOrStatusUpdateId: number;
    posts: PostsDTOResponse[];
    statusUpdates: StatusUpdatesDTOResponse[];
  };
};

const useUpdateInteractiveEntityCache = () => {
  const queryClient = useQueryClient();

  const updatePostByPost = (
    oldData: OldPostsAndStatusUpdatesDataType,
    newPost: PostsDTOResponse
  ) => {
    const { pageParams, pages } = oldData;

    const firstPage = pages[0];

    const { posts } = firstPage.data.data.postsAndStatusUpdates;
    const newPosts = [newPost, ...posts];

    pages[0].data.data.postsAndStatusUpdates.posts = newPosts;

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
      const { data: postsAndStatusUpdatesData } = data;

      const { postsAndStatusUpdates } = postsAndStatusUpdatesData;
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
