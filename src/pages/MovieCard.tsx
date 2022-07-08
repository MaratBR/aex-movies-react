import { MovieDto } from "../api/methods";
import { NavLink } from "react-router-dom";

interface MovieCardProps {
  movie: MovieDto;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="py-4 px-10 transition-all hover:bg-slate-100 hover:shadow-sm hover:z-50">
      <div>
        <NavLink
          className="text-xl font-semibold text-slate-600 hover:text-blue-900"
          to={`/movie/${movie.id}`}
        >
          {movie.name}
        </NavLink>
        <div className="flex gap-2">
          {movie.genres.map((g) => (
            <span className="px-2 text-blue-600 rounded-full bg-blue-100">
              {g.displayName}
            </span>
          ))}
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quidem,
        at voluptates mollitia in voluptas? Dignissimos quibusdam aspernatur et
        delectus quas, reprehenderit modi quisquam quod magni aperiam ipsam
        expedita rem?
      </div>
    </div>
  );
}
