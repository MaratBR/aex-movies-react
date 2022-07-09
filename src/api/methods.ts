import axios from "axios";
import client from "./client";
import {
  ActorDetailsDto,
  ActorDto,
  GenreDto,
  LoginDto,
  MovieDetailsDto,
  MovieDto,
  MovieListItemDto,
  NewMovieDto,
  RegisterDto,
  SearchMovieAdvancedOptions,
  SearchMovieOptions,
  UpdateMovieDto,
} from "./domain";

export async function login(dto: LoginDto) {
  await client.post("/api/v1/auth/login", dto);
}

export async function register(dto: RegisterDto) {
  await client.post("/api/v1/auth/register", dto);
}

export function searchMovies(
  query: string,
  options?: Partial<SearchMovieOptions>
): Promise<MovieListItemDto[]> {
  return client
    .get("/api/v1/movies/search", {
      params: {
        q: query,
        ...(options || {}),
      },
    })
    .then((r) => r.data);
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

export function createMovie(newMovie: NewMovieDto) {
  return client.post<MovieDto>("/api/v1/movies", newMovie).then((r) => r.data);
}

export async function deleteMovie(id: number) {
  await client.delete(`/api/v1/movies/${id}`);
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
