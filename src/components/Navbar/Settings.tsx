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
  const colourArray = Object.keys(ThemeColours).filter((key) => !isNaN(+key));
  return (
    <>
      <div className="ml-auto hidden sm:flex">
        {colourArray.map((colour) => (
          <div
            key={colour}
            onClick={() => {
              dispatch({
                type: ActionType.CHANGE_COLOUR,
                payload: (colour as unknown) as ThemeColours,
              });
            }}
            style={{ order: +colour == state.themeColour ? 1 : 0 }}
            className={'px-4 ' + darkColours[ThemeColours[+colour]] + ' ml-2 '}
          ></div>
        ))}
      </div>
      <div className="ml-auto flex sm:hidden">
        <div
          onClick={() => {
            dispatch({
              type: ActionType.CHANGE_COLOUR,
              payload: (((state.themeColour + 1) % colourArray.length) as unknown) as ThemeColours,
            });
          }}
          className={'px-4 ' + darkColours[ThemeColours[state.themeColour]] + ' ml-2 '}
        ></div>
      </div>
    </>
  );
};

export default Settings;
