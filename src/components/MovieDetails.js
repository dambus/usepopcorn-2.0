import { useState, useEffect } from "react";
import StarRating from "./reusable/StarRating";
// import { KEY } from "./Vars";

const KEY = "f86addd7";

export default function MovieDetails({
  selectedId,
  // onCloseMovie,
  onAddWatched,
  watched,
  error,
  setError,
  setMovieIsLoading,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  // const [error, setError] = useState("");

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

  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovieDetails() {
        try {
          setMovieIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("something went wrong getting movie data");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovie(data);
        } catch (err) {
          setError(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setMovieIsLoading(false);
          setError("");
        }
      }
      getMovieDetails();
      return function () {
        controller.abort();
      };
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
