import React, { useState, useEffect } from 'react';
// import { useLastFM } from 'use-last-fm';
import { StateStatus } from '../hooks/useLastFM/types'
import useLastFM from '../hooks/useLastFM/index';
import './NowPlayingWidget.css';
import IconButton from './IconButton';

const getDisplayTime = (minutes: number):String => {
  if(minutes >= 60 * 24) {
    return Math.floor(minutes / 60 / 24) + 'd'
  }
  if(minutes >= 60) {
    return Math.floor(minutes / 60) + 'h'
  }
  return minutes + "m"
}

const NowPlayingWidget = ({ username, removeWidget }: NPWidgetProps) => {
  const lastFM = useLastFM(username, '319574139c3d65012c05bc9d3e466609');
  const [isHovering, setIsHovering] = useState(false);
  const [minutesPassed, setMinutesPassed] = useState(0);
  useEffect(() => {
    const update = () => {
      if (lastFM.status === StateStatus.Stopped) {
        const minutes = Math.floor((new Date().getTime() - (lastFM.recent_track?.date?.getTime() || new Date().getTime())) / 1000 / 60);
        if (
          (minutesPassed < minutes && minutes < 60) ||
          Math.floor(minutesPassed / 60) < Math.floor(minutes / 60) ||
          Math.floor(minutesPassed / 60 / 24) < Math.floor(minutes / 60 / 24)
        ) {
          setMinutesPassed(minutes);
        }
      }
      if(lastFM.status === StateStatus.Playing) {
        if(minutesPassed !== 0) {
          setMinutesPassed(0);
        }
      }
    };
    update();
    const tick = setInterval(update, 1000 * 30);
    return () => {
      clearInterval(tick);
    };
  });

  return (
    <span
      className={
        'flex flex-col items-start space-y-2 pb-2 mr-2 whitespace-nowrap w-96 ' +
        (lastFM.status === StateStatus.Stopped ||
        lastFM.status === StateStatus.Initializing ||
        lastFM.status === StateStatus.Error
          ? 'text-gray-400'
          : '')
      }
      style = {{
        order: minutesPassed,
      }}
    >
      <span className="row flex w-full">
        <span className="bg-white py-1 px-3">{username}</span>
        <IconButton
          playingState={lastFM.status}
          isHovering={isHovering}
          className="bg-white ml-auto py-1 px-2"
          onClick={removeWidget}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </span>
      <span className="row bg-white py-1 px-3 overflow-hidden overflow-ellipsis max-w-full">{lastFM.current_track?.title || lastFM.recent_track?.title || 'Now'}</span>
      <span className="row flex w-96">
        <span className="bg-white py-1 px-3 overflow-hidden overflow-ellipsis max-w-full">{lastFM.current_track?.artist || lastFM.recent_track?.artist || 'Playing'}</span>
        {lastFM.status === StateStatus.Stopped && minutesPassed > 5 && (
          <span className="bg-white py-1 px-3 ml-2">
            {getDisplayTime(minutesPassed)}
          </span>
        )}
      </span>
    </span>
  );
};

export default NowPlayingWidget;

type NPWidgetProps = {
  username: string,
  removeWidget: () => void
}