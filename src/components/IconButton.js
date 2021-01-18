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

const buttonStates = {
  playing: {
    icon: <MdMusicNote />,
  },
  paused: {
    icon: <MdPause />,
  },
  skipping: {
    icon: <MdSkipNext />,
  },
  stopped: {
    icon: <MdStop />,
  },
  closing: {
    icon: <MdClose />,
  },
  undefined: {
    icon: <MdPriorityHigh />,
  },
  connecting: {
    icon: <MdLoop />,
  },
  initializing: {
    icon: <MdLeakAdd />,
  },
  error: {
    icon: <MdPriorityHigh />,
  },
};

const updateButton = (playingState, isHovering) => {
  if (isHovering) {
    return buttonStates.closing.icon;
  }
  if (typeof buttonStates[playingState] !== 'undefined') {
    return buttonStates[playingState].icon;
  }
  return buttonStates.undefined.icon;
};

const IconButton = ({ playingState, isHovering, ...props }) => {
  return <button {...props}>{updateButton(playingState, isHovering)}</button>;
};

IconButton.propTypes = {
  playingState: PropTypes.string,
  isHovering: PropTypes.bool,
};

export default IconButton;
