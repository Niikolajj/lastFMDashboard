import PropTypes from 'prop-types';
import React from 'react';
import {
  MdMusicNote,
  MdPause,
  MdSkipNext,
  MdStop,
  MdLoop,
  MdClose,
  MdPriorityHigh,
  MdLeakAdd,
} from 'react-icons/md';

const IconButton = ({ playingState, isHovering, ...props }: IconButtonProps) => {
  return <button {...props}>{updateButton(playingState, isHovering)}</button>;
};

const updateButton = (playingState: string, isHovering: boolean) => {
  if (isHovering) {
    return <MdClose />;
  }
  return getIcon(playingState);
};

const getIcon = (state: string) => {
  switch(state) {
    case 'playing': 
      return <MdMusicNote />
    case 'paused': 
      return <MdPause />
    case 'skipping': 
      return <MdSkipNext />
    case 'stopped': 
      return <MdStop />
    case 'undefined': 
      return <MdPriorityHigh />
    case 'connecting': 
      return <MdLoop />
    case 'initializing': 
      return <MdLeakAdd />
    case 'error': 
      return <MdPriorityHigh />
    default:
      return <MdPriorityHigh />
  }
}

IconButton.propTypes = {
  playingState: PropTypes.string,
  isHovering: PropTypes.bool,
};

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement>  {
  playingState: string,
  isHovering: boolean
}

export default IconButton;
