export enum StateStatus {
  Playing,
  Pausing,
  Skipping,
  Initializing,
  Error,
  Stopped,
}

type PlayingState = {
  status: StateStatus.Playing | StateStatus.Skipping | StateStatus.Pausing;
  current_track: Song;
  recent_track: Song;
};

type StoppedState = {
  status: StateStatus.Stopped;
  recent_track: Song;
  current_track: undefined;
};

type NonState = {
  status: StateStatus.Error | StateStatus.Initializing;
  recent_track: undefined;
  current_track: undefined;
};

export type State = PlayingState | StoppedState | NonState;

export enum ActionType {
  PLAY,
  STOP,
  ERROR_NO_SONGS,
  CONNECTION_LOST,
  PAUSING_ENDED,
  SKIPPING_ENDED,
}

type PlayAction = {
  type: ActionType.PLAY;
  payload: {
    current_song: Song;
    recent_song: Song;
  };
};

type StopAction = {
  type: ActionType.STOP;
  payload: {
    recent_song: Song;
  };
};

type InfoAction = {
  type:
    | ActionType.ERROR_NO_SONGS
    | ActionType.CONNECTION_LOST
    | ActionType.PAUSING_ENDED
    | ActionType.SKIPPING_ENDED;
};

export type Action = InfoAction | StopAction | PlayAction;

export type Song = {
  title: string;
  artist: string;
  date?: Date;
};

export type User = {
  id: number;
  username: string;
};

export function play(currentSong: Song, recentSong: Song): PlayAction {
  return {
    type: ActionType.PLAY,
    payload: { current_song: currentSong, recent_song: recentSong },
  };
}

export function stop(recentSong: Song): StopAction {
  return {
    type: ActionType.STOP,
    payload: { recent_song: recentSong },
  };
}

export function info(
  type:
    | ActionType.ERROR_NO_SONGS
    | ActionType.CONNECTION_LOST
    | ActionType.PAUSING_ENDED
    | ActionType.SKIPPING_ENDED
): InfoAction {
  return {
    type: type,
  };
}
