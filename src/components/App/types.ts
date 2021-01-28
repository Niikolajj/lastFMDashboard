import { User } from '../../hooks/useLastFM/types';

export enum ActionType {
  REMOVE_ITEM,
  ADD_ITEM,
  TOGGLE_NAV,
}

type NavAction = {
  type: ActionType.TOGGLE_NAV;
};

type ItemAction = {
  type: ActionType.REMOVE_ITEM | ActionType.ADD_ITEM;
  payload: User;
};

export type Action = NavAction | ItemAction;

export type State = {
  users: Array<User>;
  isNavOpen: Boolean;
};
