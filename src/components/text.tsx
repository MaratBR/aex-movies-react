import React from "react";

export function PageTitle({ children }: React.PropsWithChildren<{}>) {
  return (
    <h1 className="font-header flex items-center gap-2 text-5xl font-semibold text-slate-800 py-8 px-1">
      {children}
    </h1>
  );
}

export function Header({ children }: React.PropsWithChildren<{}>) {
  return (
    <h1 className="font-header flex items-center gap-2 text-2xl font-semibold text-slate-700 py-8 px-1">
      {children}
    </h1>
  );
}
