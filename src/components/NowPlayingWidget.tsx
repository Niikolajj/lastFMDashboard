import React, { useState, useEffect } from 'react';
// import { useLastFM } from 'use-last-fm';
import useLastFM from '../hooks/useLastFM/index';
import PropTypes from 'prop-types';
import './NowPlayingWidget.css';
import IconButton from './IconButton';

const NowPlayingWidget = ({ username, removeWidget }: NPWidgetProps) => {
  const lastFM = useLastFM(username, '319574139c3d65012c05bc9d3e466609');
  const [isHovering, setIsHovering] = useState(false);
  const [minutesPassed, setMinutesPassed] = useState(0);
  useEffect(() => {
    const update = () => {
      if (lastFM.status === 'stopped') {
        const minutes = Math.floor(((new Date()).getTime() - (lastFM?.track?.date?.getTime() || 0)) / 1000 / 60);
        if (
          (minutesPassed < minutes && minutes < 60) ||
          Math.floor(minutesPassed / 60) < Math.floor(minutes / 60)
        ) {
          setMinutesPassed(minutes);
        }
      }
    };
    update();
    const tick = setInterval(update, 1000);
    return () => {
      clearInterval(tick);
    };
  });

  return (
    <span
      className={
        'flex flex-col items-start space-y-2 pb-2 mr-2 ' +
        (lastFM.status === 'stopped' ||
        lastFM.status === 'initializing' ||
        lastFM.status === 'error'
          ? 'text-gray-400'
          : '')
      }
    >
      <span className="row flex w-96">
        <span className="bg-white py-1 px-3">{username}</span>
        <IconButton
          playingState={lastFM?.status}
          isHovering={isHovering}
          className="bg-white ml-auto py-1 px-2"
          onClick={removeWidget}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </span>
      <span className="row bg-white py-1 px-3">{lastFM?.track?.title || 'Now'}</span>
      <span className="row flex w-96">
        <span className="bg-white py-1 px-3">{lastFM?.track?.artist || 'Playing'}</span>
        {lastFM.status === 'stopped' && minutesPassed > 5 && (
          <span className="bg-white py-1 px-3 ml-2">
            {minutesPassed >= 60 ? Math.floor(minutesPassed / 60) + 'h' : minutesPassed + 'm'}
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

type NPWidgetProps = {
  username: string,
  removeWidget: () => void
}