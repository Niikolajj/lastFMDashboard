import { useEffect, useReducer } from 'react';
import reducer from './reducer';

const defaultState = {
  status: 'initializing',
  track: null,
};

const useLastFM = (username, token) => {
  const url = `//ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${token}&format=json&limit=2`;
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (state.status === 'paused') {
      let delay = setTimeout(() => dispatch({ type: 'PAUSING_ENDED' }), 10 * 1000);
      return () => clearTimeout(delay);
    }
    if (state.status === 'skipping') {
      let delay = setTimeout(() => dispatch({ type: 'SKIPPING_ENDED' }), 1000);
      return () => clearTimeout(delay);
    }
  }, [state.status]);

  useEffect(() => {
    const update = async () => {
      const resp = await fetch(url);
      const songs = (await resp.json())?.recenttracks?.track;
      if (songs && songs.length > 0) {
        const isPlaying = typeof songs['0']['@attr'] !== 'undefined';
        const recentSong = {
          title: songs[0].name,
          artist: songs[0].artist['#text'],
        };
        if (isPlaying) {
          dispatch({ type: 'PLAY', payload: recentSong });
        } else {
          dispatch({ type: 'STOP', payload: recentSong });
        }
      } else {
        dispatch({ type: 'CONNECTION_LOST' });
      }
    };
    update();
    const tick = setInterval(update, 1000);
    return () => {
      clearInterval(tick);
    };
  }, []);
  return state;
};

export default useLastFM;
