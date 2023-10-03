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
    newPost: PostsDTOResponse,
    updateType: 'create' | 'delete' | 'update'
  ): OldPostsAndStatusUpdatesDataType | undefined => {
    if (!oldData) {
      return undefined;
    }
    const { pageParams, pages } = oldData;
    if (updateType === 'create') {
      const firstPage = pages[0];

      const { posts } = firstPage.data.postsAndStatusUpdates;
      const newPosts = [newPost, ...posts];

      const newFistPage = {
        ...firstPage,
        data: {
          ...firstPage.data,
          postsAndStatusUpdates: {
            ...firstPage.data.postsAndStatusUpdates,
            posts: newPosts,
          },
        },
      };

      const newPages = [newFistPage, ...pages.slice(1)];
      return {
        pageParams,
        pages: newPages,
      };
    }
    if (updateType === 'update') {
      for (let i = 0; i < pages.length; i += 1) {
        if (
          pages[i].data.postsAndStatusUpdates.lastPostOrStatusUpdateId <=
          newPost.id
        ) {
          const { posts } = pages[i].data.postsAndStatusUpdates;
          const newPosts = posts.map((post) => {
            if (post.id === newPost.id) {
              return newPost;
            }
            return post;
          });
          const newPage = {
            ...pages[i],
            data: {
              ...pages[i].data,
              postsAndStatusUpdates: {
                ...pages[i].data.postsAndStatusUpdates,
                posts: newPosts,
              },
            },
          };
          const newPages = [
            ...pages.slice(0, i),
            newPage,
            ...pages.slice(i + 1),
          ];
          return {
            pageParams,
            pages: newPages,
          };
        }
      }
    }
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
