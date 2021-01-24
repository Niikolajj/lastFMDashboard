import { Song } from '../../types/Song';

export type PlayState = {
  status: string;
  current_track?: Song;
  recent_track: Song | undefined;
};
