import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import { State, Song } from './types';

const defaultState: State = {
  status: 'initializing',
  current_track: undefined,
  recent_track: undefined,
};

const useLastFM = (username: string, token: string) => {
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
      try {
        const resp = await fetch(url);
        const songs = (await resp.json())?.recenttracks?.track;
        if (songs && songs.length > 0) {
          const isPlaying = typeof songs['0']['@attr'] !== 'undefined';
          const firstSong: Song = {
            title: songs[0].name,
            artist: songs[0].artist['#text'],
            date: new Date(songs[0].date?.uts * 1000) || null,
          };
          const secondSong: Song = {
            title: songs[1].name,
            artist: songs[1].artist['#text'],
            date: new Date(songs[1].date?.uts * 1000) || null,
          };
          if (isPlaying) {
            dispatch({
              type: 'PLAY',
              payload: { current_song: firstSong, recent_song: secondSong },
            });
          } else {
            dispatch({
              type: 'STOP',
              payload: { recent_song: secondSong },
            });
          }
        } else if (songs.length === 0) {
          dispatch({ type: 'ERROR_NO_SONGS' });
        } else {
          dispatch({ type: 'CONNECTION_LOST' });
        }
      } catch {
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
