import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getActor } from "../api";
import ErrorView from "../components/ErrorView";
import Loading from "../components/Loading";
import PageContent from "../components/PageContent";
import { Header, PageTitle } from "../components/text";
import MovieCard from "./MovieCard";

export default function ActorPage() {
  const { id: idStr } = useParams();
  const id = +(idStr ?? "");
  const actor = useQuery(["actor", id], () => getActor(id));

  if (actor.isLoading) {
    return <Loading />;
  }

  if (actor.isError) {
    return <ErrorView error={actor.error} />;
  }

  const a = actor.data!;

  return (
    <>
      <PageTitle>{a.name}</PageTitle>
      <PageContent className="p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad,
        saepe nihil cupiditate id minima eum suscipit assumenda recusandae illo,
        consectetur magnam consequatur explicabo rem aspernatur dicta laudantium
        culpa nulla.
        <Header>Movies</Header>
        {a.movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </PageContent>
    </>
  );
}
