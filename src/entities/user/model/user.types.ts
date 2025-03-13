export type TUser = {
  uuid: string;
  email: string;
  username: string | null;
  created_at: Date;
  is_deleted: boolean;
  is_activated: boolean;
};
