export type Action = {
  type: string;
  payload?: {
    current_song?: Song;
    recent_song: Song;
  };
};

export type State = {
  status: string;
  current_track?: Song;
  recent_track: Song | undefined;
};

export type Song = {
  title: string;
  artist: string;
  date?: Date;
};

export type User = {
  id: number;
  username: string;
};
