import { Song } from '../../types/Song';

export type PlayState = {
  status: string;
  track?: Song;
};
