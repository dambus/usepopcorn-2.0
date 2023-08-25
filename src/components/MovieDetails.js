import { useState, useEffect } from "react";
import StarRating from "./reusable/StarRating";
import Loader from "./Loader";
// import { KEY } from "./Vars";

const KEY = "f86addd7";

export default function MovieDetails({
  selectedId,
  // onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    // onCloseMovie();
  }

  // useEffect(
  //   function () {
  //     function callBack(e) {
  //       if (e.code === "Escape") {
  //         // onCloseMovie();
  //       }
  //     }

  //     document.addEventListener("keydown", callBack);
  //     return function () {
  //       document.removeEventListener("keydown", callBack);
  //     };
  //   },
  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      <header>
        <img
          src={poster}
          alt={`Poster of ${movie} movie`}
          className="h-[240px] object-cover flex items-center m-auto md:ms-0"
        />
        <div className="details-overview">
          <h2 className="text-white font-bold text-xl mt-2">{title}</h2>
          <p className="text-gray-400 text-sm">
            {released} &bull; {runtime}
          </p>
          <p className="text-gray-400 text-sm">{genre}</p>
          <p className="text-gray-400 text-sm mt-2">
            <span>⭐ </span>
            <strong>{imdbRating}</strong> IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating my-4">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={userRating}
              />
              {userRating > 0 && (
                <button
                  className="btn-add text-center bg-gray-400 rounded-md justify-center py-1 px-2 m-auto mt-2 flex"
                  onClick={handleAdd}
                >
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-gray-300">
                You rated this movie {watchedUserRating} <span>⭐</span>
              </p>
            </>
          )}
        </div>
        <p className="text-gray-300 max-w-prose mb-2">
          <em>{plot}</em>
        </p>
        <p className="text-gray-400">Starring: {actors}</p>
        <p className="text-gray-400">{`Directed by ${director}`}</p>
      </section>
    </>
  );
}
