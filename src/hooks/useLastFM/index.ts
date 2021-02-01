import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import { State, Song, ActionType, play, stop, info, StateStatus } from './types';

const defaultState: State = {
  status: StateStatus.Initializing,
  current_track: undefined,
  recent_track: undefined,
};

const useLastFM = (username: string, token: string): State => {
  const url = `//ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${token}&format=json&limit=2`;
  const [state, dispatch] = useReducer(reducer, defaultState);
  useEffect(() => {
    if (state.status === StateStatus.Pausing) {
      const delay = setTimeout(() => dispatch({ type: ActionType.PAUSING_ENDED }), 10 * 1000);
      return () => clearTimeout(delay);
    }
    if (state.status === StateStatus.Skipping) {
      const delay = setTimeout(() => dispatch({ type: ActionType.SKIPPING_ENDED }), 1000);
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
          const recentSong: Song = {
            title: songs[isPlaying ? 1 : 0].name,
            artist: songs[isPlaying ? 1 : 0].artist['#text'],
            date: new Date(songs[isPlaying ? 1 : 0].date?.uts * 1000),
          };

          if (isPlaying) {
            const currentSong: Song = {
              title: songs[0].name,
              artist: songs[0].artist['#text'],
            };
            dispatch(play(currentSong, recentSong));
          } else {
            dispatch(stop(recentSong));
          }
        } else if (songs.length === 0) {
          dispatch(info(ActionType.ERROR_NO_SONGS));
        } else {
          dispatch(info(ActionType.CONNECTION_LOST));
        }
      } catch {
        dispatch(info(ActionType.CONNECTION_LOST));
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
