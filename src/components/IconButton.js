import PropTypes from 'prop-types';
import React from 'react';
import {
  MdMusicNote,
  MdPause,
  MdSkipNext,
  // MdStop,
  MdLoop,
  MdClose,
  MdPriorityHigh,
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
    icon: <MdClose />,
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
