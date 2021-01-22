import { AppState } from '../../types/AppState';
import { AppAction } from '../../types/AppAction';
import { User } from '../../types/User';

const reducer = (state: AppState, action: AppAction): AppState => {
  if (action.type === 'REMOVE_ITEM' && action.payload) {
    const newUsers = state.users.filter((user) => user !== action.payload);
    localStorage.setItem('users', JSON.stringify(newUsers));
    return { ...state, users: newUsers };
  }
  if (action.type === 'ADD_ITEM' && action.payload) {
    const newUsers: User[] = [...state.users, action.payload];
    localStorage.setItem('users', JSON.stringify(newUsers));
    return { ...state, users: newUsers };
  }
  if (action.type === 'TOGGLE_NAV') {
    return { ...state, isNavOpen: !state.isNavOpen };
  }
  return state;
};

export default reducer;
