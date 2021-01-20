import { Song } from '../../types/Song';

export type PlayAction = {
  type: string;
  payload?: Song;
};
