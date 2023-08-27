export type StatusContentType = {
  id: string;
  content: string;
};

export type StatusListType = StatusContentType[];

export type InitialStatusStateType = {
  status: StatusListType;
};
