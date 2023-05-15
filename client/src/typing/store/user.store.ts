import { User } from "../user";

export interface UserStore {
  token: string | null;
  currentUser: User | null;
}
