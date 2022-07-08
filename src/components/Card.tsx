import React from "react";

export default function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="p-2 rounded-lg shadow-md bg-white my-2">{children}</div>
  );
}
