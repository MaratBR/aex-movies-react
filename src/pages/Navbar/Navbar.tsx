import NavLink from "./NavLink";
import { SearchIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <nav className="bg-white px-2 mb-8">
      <div className="border-b-gray-200 px-2 flex justify-center">
        <NavLink to="/">Search</NavLink>
        <NavLink to="/advanced">Advanced search</NavLink>
      </div>
    </nav>
  );
}
