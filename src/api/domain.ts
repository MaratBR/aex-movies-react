export interface LoginDto {
  login: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}

export interface SearchMovieOptions {
  byName: boolean;
  byGenre: boolean;
  byActor: boolean;
}

export type MpaRating = "G" | "Pg" | "Pg13" | "R" | "Nc17";

export interface MovieDto {
  id: number;
  mpa: MpaRating;
  name: string;
}
export interface MovieListItemDto extends MovieDto {
  genres: GenreDto[];
}

export interface ActorDto {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ActorDetailsDto extends ActorDto {
  movies: MovieListItemDto[];
}

export interface GenreDto {
  id: number;
  normalizedName: string;
  displayName: string;
}

export interface MovieDetailsDto extends MovieDto {
  actors: ActorDto[];
  genres: GenreDto[];
}

export interface SearchMovieAdvancedOptions {
  nameQuery?: string | null;
  genreIds?: number[];
  actorIds?: number[];
}

export interface NewMovieDto {
  actorIds: number[];
  genreIds: number[];
  name: string;
  mpa: MpaRating;
}

export interface UpdateMovieDto {
  mpa?: MpaRating | null;
  genreIds?: number[] | null;
  actorIds?: number[] | null;
  name?: string | null;
}
