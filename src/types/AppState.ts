import { User } from './User';

export type AppState = {
  users: Array<User>;
  isNavOpen: Boolean;
};
