import React, { useState } from 'react';
// import { useLastFM } from 'use-last-fm';
import useLastFM from './useLastFM/index';
import PropTypes from 'prop-types';
import './NowPlayingWidget.css';
import IconButton from './IconButton';

const NowPlayingWidget = ({ username, removeWidget }) => {
  const lastFM = useLastFM(username, '319574139c3d65012c05bc9d3e466609');
  const [isHovering, setIsHovering] = useState(false);
  const timePassed = new Date(new Date() - lastFM?.track?.date);
  return (
    <span
      className={
        'flex flex-col items-start space-y-2 pb-2 mr-2 ' +
        (lastFM.status === 'stopped' || lastFM.status === 'initializing' ? 'text-gray-400' : '')
      }
    >
      <span className="row flex w-96">
        <span className="bg-white py-1 px-3">{username}</span>
        <IconButton
          playingState={lastFM?.status}
          isHovering={isHovering}
          type="button"
          className="bg-white ml-auto py-1 px-2"
          onClick={removeWidget}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </span>
      <span className="row bg-white py-1 px-3">{lastFM?.track?.title || 'Now'}</span>
      <span className="row flex w-96">
        <span className="bg-white py-1 px-3">{lastFM?.track?.artist || 'Playing'}</span>
        {lastFM.status === 'stopped' && timePassed.getTime() / 60 / 1000 > 10 && (
          <span className="bg-white py-1 px-3 ml-2">
            {timePassed.getHours() - 1
              ? timePassed.getHours() + 'h'
              : timePassed.getMinutes() + 'm'}
          </span>
        )}
      </span>
    </span>
  );
};

NowPlayingWidget.propTypes = {
  removeWidget: PropTypes.func,
  username: PropTypes.string.isRequired,
};

NowPlayingWidget.defaultProps = {
  removeWidget: null,
};

export default NowPlayingWidget;
