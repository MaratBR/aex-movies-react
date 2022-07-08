import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import AsyncSelect from "react-select/async";
import { useNavigate, useParams } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  ActorDto,
  GenreDto,
  MovieDto,
  searchActors,
  searchGenres,
  searchMovies,
  searchMoviesAdvanced,
} from "../api/methods";
import ErrorView from "../components/ErrorView";
import MovieCard from "./MovieCard";
import S from "./SearchMoviesPage.module.scss";
import { useQuery } from "react-query";
import Card from "../components/Card";
import Button from "../components/Button";
import { SearchIcon } from "@heroicons/react/outline";
import PageContent from "../components/PageContent";
import { PageTitle } from "../components/text";

const PLACEHOLDERS = [
  "romance",
  "horror",
  "Kill Bill",
  "Avengers",
  "Robert Downey Jr",
];

interface SearchMoviesPageProps {
  advanced?: boolean;
}

export default function SearchMoviesPage({ advanced }: SearchMoviesPageProps) {
  const [params, setParams] = useSearchParams();

  const query = useMemo(() => params.get("q") ?? "", [params]);
  const genreIds = useMemo(
    () =>
      params
        .getAll("genreIds")
        .map((v) => +v)
        .filter((v) => !Number.isNaN(v)),
    [location.search]
  );
  const actorIds = useMemo(
    () =>
      params
        .getAll("actorIds")
        .map((v) => +v)
        .filter((v) => !Number.isNaN(v)),
    [location.search]
  );

  const [nextQuery, setNextQuery] = useState(query);

  const [genres, setGenres] = useState<GenreDto[]>([]);
  const [actors, setActors] = useState<ActorDto[]>([]);

  const placeholder = useMemo(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)],
    []
  );

  const movies = useQuery<MovieDto[]>(
    "movies",
    () => {
      if (advanced) {
        return searchMoviesAdvanced({ nameQuery: query, genreIds, actorIds });
      } else {
        return searchMovies(query);
      }
    },
    {
      cacheTime: 0,
    }
  );

  function onSearchInputSubmit() {
    if (!advanced) submitQueryParams();
  }

  // update query params
  function submitQueryParams() {
    const params: Record<string, any> = {
      q: nextQuery.trim(),
    };

    if (advanced) {
      params.genreIds = genres.map((g) => g.id);
      params.actorIds = actors.map((a) => a.id);
    }

    setParams(params);
  }

  async function loadGenres(input: string) {
    const genres = await searchGenres(input);
    return genres.map((g) => ({ value: g, label: g.displayName }));
  }

  async function loadActors(input: string) {
    const genres = await searchActors(input);
    return genres.map((g) => ({ value: g, label: g.name }));
  }

  // fetch new data whenever query params change
  useEffect(() => {
    movies.refetch();
  }, [query, actorIds, genreIds]);

  let resultsView: React.ReactNode = "Loading....";

  if (!movies.isLoading) {
    resultsView = (
      <div className={S.results}>
        <ErrorView error={movies.error} />
        <div className={S.movies}>
          {movies.data?.length ? (
            movies.data.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="text-slate-700 text-center py-10 font-semibold text-lg">
              Movies not found
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle>
        <SearchIcon className="-translate-y-1.5" width={50} />
        <span>
          Find your next <span className="text-blue-500">favourite</span> movie!
        </span>
      </PageTitle>
      <PageContent>
        <NavLink
          className="inline-block p-7 text-sm hover:text-gray-600"
          to={advanced ? "/" : "/advanced"}
        >
          Go to {advanced ? "simple" : "advanced"} mode
        </NavLink>
        <input
          className="w-full my-6 text-4xl outline-none focus:bg-slate-100 py-3 px-6 border-b-2 border-transparent"
          value={nextQuery}
          onChange={(e) => setNextQuery(e.target.value)}
          onKeyDown={(e) => (e.code === "Enter" ? onSearchInputSubmit() : 0)}
          placeholder={placeholder}
        />
        {advanced ? (
          <div className="px-6 flex flex-col items-start gap-3 py-2 bg-slate-50">
            <div className="flex gap-3 flex-col w-1/2">
              <div>
                <h3 className="text-3xl pb-2">Genres</h3>
                <AsyncSelect
                  isMulti
                  loadOptions={loadGenres}
                  onChange={(v) => setGenres([...v].map((p) => p.value))}
                />
              </div>

              <div>
                <h3 className="text-3xl pb-2">Actors</h3>
                <AsyncSelect
                  isMulti
                  loadOptions={loadActors}
                  onChange={(v) => setActors([...v].map((p) => p.value))}
                />
              </div>
            </div>
            <p>
              <b>Note</b>: both actors and genres use OR logic i.e. if you put
              "Romance" and "Science fiction" you will get movies that have{" "}
              <i>at least one</i> of those genres
            </p>
            <Button onClick={() => submitQueryParams()}>Search</Button>
          </div>
        ) : undefined}
        {resultsView}
      </PageContent>
    </div>
  );
}
