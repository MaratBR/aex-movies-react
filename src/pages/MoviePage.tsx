import { useQuery } from "react-query";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { getMovie } from "../api";
import ErrorView from "../components/ErrorView";
import Loading from "../components/Loading";
import PageContent from "../components/PageContent";
import { Header, PageTitle } from "../components/text";

export default function MoviePage() {
  const { id: idStr } = useParams();
  const id = +(idStr ?? "");
  const movie = useQuery(["movie", id], () => getMovie(id));

  if (movie.isLoading) {
    return <Loading />;
  }

  if (movie.isError) {
    return <ErrorView error={movie.error} />;
  }

  const m = movie.data!;

  return (
    <>
      <PageTitle>{m.name}</PageTitle>
      <div className="py-3 px-2 flex gap-1 flex-wrap">
        {m.genres.map((g) => (
          <span
            key={g.id}
            className="p-2 rounded-md text-lg bg-blue-100 text-blue-700"
          >
            {g.displayName}
          </span>
        ))}
      </div>
      <PageContent className="p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad,
        saepe nihil cupiditate id minima eum suscipit assumenda recusandae illo,
        consectetur magnam consequatur explicabo rem aspernatur dicta laudantium
        culpa nulla.
        <Header>Actors</Header>
        <ul>
          {m.actors.map((a) => (
            <li>
              <NavLink
                to={`/actor/${a.id}`}
                key={a.id}
                className="px-1 hover:text-blue-800"
              >
                {a.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </PageContent>
    </>
  );
}
