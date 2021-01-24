import { PlayState } from '../../types/useLastFM/PlayState';
import { PlayAction } from '../../types/useLastFM/PlayAction';

const reducer = (state: PlayState, action: PlayAction): PlayState => {
  switch (action.type) {
    case 'PLAY':
      if (state.status === 'initializing' || state.status === 'error') {
        return {
          ...state,
          status: 'playing',
          current_track: action.payload?.current_song,
          recent_track: action.payload?.recent_song,
        };
      } else if (
        JSON.stringify(action.payload?.current_song) !== JSON.stringify(state.current_track)
      ) {
        return {
          ...state,
          status: 'skipping',
          current_track: action.payload?.current_song,
          recent_track: action.payload?.recent_song,
        };
      } else if (state.status === 'skipping' || state.status === 'playing') {
        return state;
      } else {
        return { ...state, status: 'playing' };
      }
    case 'STOP':
      if (state.status === 'initializing' || state.status === 'error') {
        return {
          ...state,
          status: 'stopped',
          current_track: action.payload?.current_song,
          recent_track: action.payload?.recent_song,
        };
      } else if (state.status === 'playing' || state.status === 'skipping') {
        return { ...state, status: 'paused' };
      } else if (state.status === 'paused' || state.status === 'stopped') {
        return state;
      }
      return { ...state, status: 'stopped' };
    case 'PAUSING_ENDED':
      return {
        ...state,
        status: 'stopped',
        current_track: undefined,
      };
    case 'SKIPPING_ENDED':
      return { ...state, status: 'playing' };
    case 'ERROR_NO_SONGS':
      if (state.status !== 'error') {
        return {
          ...state,
          status: 'error',
          recent_track: { title: 'No songs', artist: '/Error/' },
        };
      }
      return state;
    case 'CONNECTION_LOST':
      return state;
    default:
      return state;
  }
};
export default reducer;
