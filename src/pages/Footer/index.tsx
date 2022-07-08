import { HeartIcon } from "@heroicons/react/solid";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto py-20">
        <div className="text-slate-500">
          Made by <b>MaratBR</b> with{" "}
          <HeartIcon className="inline" width={30} /> <br />
          <a
            className="hover:text-white underline decoration-dotted underline-offset-4"
            target="_blank"
            href="https://github.com/MaratBR/AEXMovies"
          >
            Source code on Github
          </a>
        </div>
      </div>
    </footer>
  );
}
