import React, { useReducer } from 'react';
import './App.css';
import NowPlayingWidget from '../NowPlayingWidget';
import { Action, ActionType, State, ThemeColours } from './types';
import { User } from '../../hooks/useLastFM/types';
import reducer from './reducer';
import Navbar from '../Navbar';

const Users: User[] = [];

const defaultState: State = {
  users: Users,
  isNavOpen: true,
  themeColour: ThemeColours.blue,
};

const init = (initialState: State) => {
  initialState.users = JSON.parse(localStorage.getItem('users') ?? '[]');
  initialState.isNavOpen = initialState.users.length === 0;
  return initialState;
};

type StateContextProps = {
  state: State;
  dispatch: (action: Action) => void;
};

export const AppContext = React.createContext<Partial<StateContextProps>>({});
const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState, init);
  return (
    <div
      className={
        'App bg-' + ThemeColours[state.themeColour] + '-200' + (state.isNavOpen ? '' : ' navClosed')
      }
    >
      <AppContext.Provider value={{ state, dispatch }}>
        <Navbar />
      </AppContext.Provider>
      <div className="content-start flex flex-col flex-wrap h-screen p-2">
        {state.users.map((user) => (
          <NowPlayingWidget
            key={user.id}
            username={user.username}
            removeWidget={() => dispatch({ type: ActionType.REMOVE_ITEM, payload: user })}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
