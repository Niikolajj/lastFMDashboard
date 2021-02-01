import { State, Action } from './types';
import { User } from '../../hooks/useLastFM/types';
import { ActionType } from './types';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.REMOVE_ITEM: {
      const newUsers = state.users.filter((user) => user !== action.payload);
      localStorage.setItem('users', JSON.stringify(newUsers));
      return { ...state, users: newUsers };
    }
    case ActionType.ADD_ITEM: {
      const newUsers: User[] = [...state.users, action.payload];
      localStorage.setItem('users', JSON.stringify(newUsers));
      return { ...state, users: newUsers };
    }
    case ActionType.TOGGLE_NAV:
      return { ...state, isNavOpen: !state.isNavOpen };
    case ActionType.CHANGE_COLOUR:
      return { ...state, themeColour: action.payload };
  }
};

export default reducer;
