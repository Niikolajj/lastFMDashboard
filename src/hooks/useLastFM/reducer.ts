import { Action, State, ActionType, StateStatus } from './types';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.PLAY:
      switch (state.status) {
        case StateStatus.Initializing:
        case StateStatus.Error:
        case StateStatus.Stopped:
          return {
            ...state,
            status: StateStatus.Playing,
            current_track: action.payload.current_song,
            recent_track: action.payload.recent_song,
          };
        case StateStatus.Skipping:
        case StateStatus.Playing:
          if (JSON.stringify(action.payload.current_song) !== JSON.stringify(state.current_track)) {
            return {
              ...state,
              status: StateStatus.Skipping,
              current_track: action.payload.current_song,
              recent_track: action.payload.recent_song,
            };
          }
          return state;
        case StateStatus.Pausing:
          return { ...state, status: StateStatus.Playing };
      }
      break;
    case ActionType.STOP:
      switch (state.status) {
        case StateStatus.Initializing:
        case StateStatus.Error:
          return {
            ...state,
            status: StateStatus.Stopped,
            recent_track: action.payload?.recent_song,
          };
        case StateStatus.Playing:
        case StateStatus.Skipping:
          return { ...state, status: StateStatus.Pausing };
        case StateStatus.Pausing:
        case StateStatus.Stopped:
          return state;
      }
      break;
    case ActionType.PAUSING_ENDED:
      switch (state.status) {
        case StateStatus.Pausing:
          return {
            ...state,
            status: StateStatus.Stopped,
            current_track: undefined,
          };
        default:
          return state;
      }
    case ActionType.SKIPPING_ENDED:
      switch (state.status) {
        case StateStatus.Skipping:
          return { ...state, status: StateStatus.Playing };
        default:
          return state;
      }
    case ActionType.ERROR_NO_SONGS:
      switch (state.status) {
        case StateStatus.Error:
          return {
            status: StateStatus.Error,
            current_track: undefined,
            recent_track: undefined,
          };
        default:
          return state;
      }
    case ActionType.CONNECTION_LOST:
      return state;
    default:
      return state;
  }
};
export default reducer;
