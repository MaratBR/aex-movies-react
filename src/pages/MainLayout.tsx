import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
