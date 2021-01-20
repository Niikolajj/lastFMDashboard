import React, { useReducer, useRef, useState } from 'react';
import './App.css';
import NowPlayingWidget from '../NowPlayingWidget';
import { MdExpandLess, MdExpandMore, MdAdd } from 'react-icons/md';
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
const Users: User[] = []

const defaultState:AppState = {
  users: Users,
  isNavOpen: true,
};

const init = (initialState: AppState) => {
  initialState.users = JSON.parse(localStorage.getItem('users') ?? '[]');
  initialState.isNavOpen = initialState.users.length === 0;
  return initialState;
};

const App = () => {
  const addUserRef = useRef<HTMLInputElement>(null);
  const [idCount, setIdCount] = useState(defaultState.users.length + 1);
  const [state, dispatch] = useReducer(reducer, defaultState, init);
  const addUser = () => {
    if(addUserRef.current)
    {
      dispatch({ type: 'ADD_ITEM', payload: { id: idCount, username: addUserRef.current.value } });
      addUserRef.current.value = '';
      setIdCount(idCount + 1);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addUser();
    }
  };
  return (
    <div className={'App bg-green-200' + (state.isNavOpen ? '' : ' navClosed')}>
      <div className="p-2 bg-green-300">
        <span className="text-lg flex space-x-2">
          <input
            placeholder="LastFM Username"
            className="bg-transparent bg-white py-1 px-3"
            type="text"
            ref={addUserRef}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="bg-white p-2" onClick={addUser}>
            <MdAdd />
          </button>
          <button
            type="button"
            className="bg-green-400 p-3 absolute top-14 right-1"
            onClick={() => {
              dispatch({ type: 'TOGGLE_NAV' });
            }}
          >
            {state.isNavOpen ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </span>
      </div>
      <div className="content-start flex flex-col flex-wrap h-screen p-2">
        {state.users.map((user) => (
          <NowPlayingWidget
            key={user.id}
            username={user.username}
            removeWidget={() => dispatch({ type: 'REMOVE_ITEM', payload: user })}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
