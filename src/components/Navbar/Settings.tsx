import React from 'react';
import { AppContext } from '../App';
import { ThemeColours, ActionType } from '../App/types';
import { useContext } from 'react';

const Settings: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  if (!state || !dispatch) {
    return <div>Error</div>;
  }
  return (
    <div className="flex self-end">
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
            className={'px-4 bg-' + ThemeColours[+colour] + '-400 ml-2'}
          ></div>
        ))}
    </div>
  );
};

export default Settings;
