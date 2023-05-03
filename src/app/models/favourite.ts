import {Movie} from "./movie";

export interface Favourite {
  userId: string;
  movies: Movie[];
}
