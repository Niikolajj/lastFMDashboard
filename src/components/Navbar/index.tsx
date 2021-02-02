import React, { useRef, useState } from 'react';
import { MdAdd, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { ActionType, ThemeColours } from '../App/types';
import { AppContext } from '../App';
import Settings from './Settings';
import { mediumColours } from '../../utils/tailwindClassesHelper';

const Navbar: React.FC = () => {
  const addUserRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = React.useContext(AppContext);
  if (!state || !dispatch) {
    return <div>ERRAR</div>;
  }
  const [idCount, setIdCount] = useState(state.users.length + 1);
  const addUser = () => {
    if (addUserRef.current) {
      dispatch({
        type: ActionType.ADD_ITEM,
        payload: { id: idCount, username: addUserRef.current.value },
      });
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
    <div className={'p-2 ' + mediumColours[ThemeColours[state.themeColour]] + ' content-center'}>
      <span className="text-lg flex">
        <input
          placeholder="LastFM Username"
          className="bg-transparent bg-white py-1 px-3 w-full sm:w-auto"
          type="text"
          ref={addUserRef}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="bg-white p-2" onClick={addUser}>
          <MdAdd />
        </button>
        <Settings />
        <button
          type="button"
          className={
            mediumColours[ThemeColours[state.themeColour]] + ' p-3 absolute top-14 right-1'
          }
          onClick={() => {
            dispatch({ type: ActionType.TOGGLE_NAV });
          }}
        >
          {state.isNavOpen ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </span>
    </div>
  );
};

export default Navbar;
