import { Song } from '../../types/Song';

export type PlayAction = {
  type: string;
  payload?: {
    current_song?: Song;
    recent_song: Song;
  };
};
