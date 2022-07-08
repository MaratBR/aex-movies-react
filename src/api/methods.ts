import axios from "axios";
import qs from "qs";

const client = axios.create({
  timeout: 30000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export interface LoginDto {
  login: string;
  password: string;
}

export async function login(dto: LoginDto) {
  await client.post("/api/v1/auth/login", dto);
}

export interface RegisterDto {
  username: string;
  password: string;
}

export async function register(dto: RegisterDto) {
  await client.post("/api/v1/auth/register", dto);
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

export function searchMovies(
  query: string,
  options?: Partial<SearchMovieOptions>
) {
  return client
    .get("/api/v1/movies/search", {
      params: {
        q: query,
        ...(options || {}),
      },
    })
    .then((r) => r.data);
}

export interface SearchMovieAdvancedOptions {
  nameQuery?: string | null;
  genreIds?: number[];
  actorIds?: number[];
}

export function searchMoviesAdvanced(
  options?: Partial<SearchMovieAdvancedOptions>
): Promise<MovieListItemDto[]> {
  return client
    .get("/api/v1/movies/search/advanced", { params: options })
    .then((r) => r.data);
}

export function getMovie(id: number): Promise<MovieDetailsDto> {
  return client.get(`/api/v1/movies/${id}`).then((r) => r.data);
}

export interface NewMovieDto {
  actorIds: number[];
  genreIds: number[];
  name: string;
  mpa: MpaRating;
}

export function createMovie(newMovie: NewMovieDto) {
  return client.post<MovieDto>("/api/v1/movies", newMovie).then((r) => r.data);
}

export async function deleteMovie(id: number) {
  await client.delete(`/api/v1/movies/${id}`);
}

export interface UpdateMovieDto {
  mpa?: MpaRating | null;
  genreIds?: number[] | null;
  actorIds?: number[] | null;
  name?: string | null;
}

export async function updateMovie(id: number, dto: UpdateMovieDto) {
  await client.patch(`/api/v1/movies/${id}`, dto);
}

export function searchGenres(
  query?: string | undefined | null
): Promise<GenreDto[]> {
  return client
    .get("/api/v1/genres", { params: { q: query } })
    .then((r) => r.data);
}

export function getActor(id: number): Promise<ActorDetailsDto> {
  return client.get(`/api/v1/actors/${id}`).then((r) => r.data);
}

export function searchActors(query: string): Promise<ActorDto[]> {
  return client
    .get("/api/v1/actors/search", { params: { q: query } })
    .then((r) => r.data);
}
