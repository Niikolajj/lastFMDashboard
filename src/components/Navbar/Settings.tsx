import React from 'react';
import { AppContext } from '../App';
import { ThemeColours, ActionType } from '../App/types';
import { useContext } from 'react';
import { darkColours } from '../../utils/tailwindClassesHelper';

const Settings: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  if (!state || !dispatch) {
    return <div>Error</div>;
  }
  return (
    <div className="flex ml-auto">
      {Object.keys(ThemeColours)
        .filter((key) => !isNaN(+key))
        .map((colour) => (
          <div
            key={colour}
            onClick={() => {
              dispatch({
                type: ActionType.CHANGE_COLOUR,
                payload: (colour as unknown) as ThemeColours,
              });
            }}
            className={'px-4 ' + darkColours[ThemeColours[+colour]] + ' ml-2'}
          ></div>
        ))}
    </div>
  );
};

export default Settings;
