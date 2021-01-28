import PropTypes from 'prop-types';
import React from 'react';
import {
  MdMusicNote,
  MdPause,
  MdSkipNext,
  MdStop,
  MdClose,
  MdPriorityHigh,
  MdLeakAdd,
} from 'react-icons/md';
import { StateStatus } from '../hooks/useLastFM/types';

const IconButton = ({ playingState, isHovering, ...props }: IconButtonProps) => {
  return <button {...props}>{updateButton(playingState, isHovering)}</button>;
};

const updateButton = (playingState: StateStatus, isHovering: boolean) => {
  if (isHovering) {
    return <MdClose />;
  }
  return getIcon(playingState);
};

const getIcon = (state: StateStatus) => {
  switch(state) {
    case StateStatus.Playing: 
      return <MdMusicNote />
    case StateStatus.Pausing: 
      return <MdPause />
    case StateStatus.Skipping: 
      return <MdSkipNext />
    case StateStatus.Stopped: 
      return <MdStop />
    case StateStatus.Initializing: 
      return <MdLeakAdd />
    case StateStatus.Error: 
      return <MdPriorityHigh />
    default:
      return <MdPriorityHigh />
  }
}

IconButton.propTypes = {
  playingState: StateStatus,
  isHovering: PropTypes.bool,
};

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement>  {
  playingState: StateStatus,
  isHovering: boolean
}

export default IconButton;
