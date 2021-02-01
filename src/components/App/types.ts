import { User } from '../../hooks/useLastFM/types';

export enum ActionType {
  REMOVE_ITEM,
  ADD_ITEM,
  TOGGLE_NAV,
  CHANGE_COLOUR,
}

type NavAction = {
  type: ActionType.TOGGLE_NAV;
};

type ItemAction = {
  type: ActionType.REMOVE_ITEM | ActionType.ADD_ITEM;
  payload: User;
};

type ThemeAction = {
  type: ActionType.CHANGE_COLOUR;
  payload: ThemeColours;
};

export type Action = NavAction | ItemAction | ThemeAction;

export enum ThemeColours {
  blue,
  green,
  gray,
  indigo,
  pink,
  purple,
  red,
  yellow,
}

export type State = {
  users: Array<User>;
  isNavOpen: boolean;
  themeColour: ThemeColours;
};
