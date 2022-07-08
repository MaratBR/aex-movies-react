import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import ActorPage from "./pages/ActorPage";
import MainLayout from "./pages/MainLayout";
import MoviePage from "./pages/MoviePage";
import SearchMoviesPage from "./pages/SearchMoviesPage";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="" element={<SearchMoviesPage />} />
            <Route path="/advanced" element={<SearchMoviesPage advanced />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/actor/:id" element={<ActorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
