import { useEffect, useState } from "react";
// import { KEY } from "./components/Vars";
import Loader from "./components/Loader";
import NavBar from "./components/Navbar";
import Logo from "./components/Logo";
import Search from "./components/Search";
// import SearchResults from "./components/SearchResults";
import Box from "./components/reusable/Box";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import Modal from "./components/Modal";

const KEY = "f86addd7";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const watchedItems = JSON.parse(localStorage.getItem("watchedMovies"));
    if (watchedItems) {
      return watchedItems;
    } else {
      return [];
    }
  });
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watched));
    },
    [watched]
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    setOpenModal(true);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("APP_WATCHED", JSON.stringify(watched));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          // console.error(err.message);
          setError(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="max-w-5xl min-h-screen bg-[#404040]">
      <Modal
        btnContent={"cancel"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        isLoading={isLoading}
      >
        {/* {isLoading ? (
          <Loader />
        ) : ( */}
        {selectedId && (
          <MovieDetails
            selectedId={selectedId}
            // onCloseMovie={handleCloseMovie}
            onAddWatched={handleAddWatched}
            watched={watched}
          />
        )}

        {/* )} */}
      </Modal>
      <NavBar>
        <Logo />
      </NavBar>
      <Main>
        <>
          <Search query={query} setQuery={setQuery} />
          {/* <SearchResults movies={movies} /> */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />}*/}
        </>
        {/* <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box> */}
      </Main>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>X</span> {message}
    </p>
  );
}

function Main({ children }) {
  return <main className="main w-full mt-[80px] ">{children}</main>;
}
