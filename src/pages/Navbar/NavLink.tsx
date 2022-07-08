import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLink {
  to: string;
  children?: React.ReactNode;
}

export default function NavLink({ to, children }: NavLink) {
  return (
    <RouterNavLink
      to={to}
      className="text-base py-10 px-6 font-bold text-slate-600 hover:text-slate-900 
            active:bg-blue-100 transition-colors active:text-blue-700 flex align-middle"
    >
      {children}
    </RouterNavLink>
  );
}
