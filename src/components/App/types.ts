import { User } from '../../hooks/useLastFM/types';

export type State = {
  users: Array<User>;
  isNavOpen: Boolean;
};

export type Action = {
  type: string;
  payload?: User;
};
