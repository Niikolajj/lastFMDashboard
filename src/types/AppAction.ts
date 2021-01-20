import { User } from './User';

export type AppAction = {
  type: string;
  payload?: User;
};
