export interface UserStore {
  token: string | null;
  currentUserId: number | null; //TO DO переделать, чтобы получать еще имя
}
