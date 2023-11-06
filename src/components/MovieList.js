import Movie from "./Movie";
export default function MovieList({ movies, onSelectMovie }) {
  return (
    <>
      <h3 className="w-100 block text-white text-center mx-2 h-8 bg-[#533D7B] text-lg item-center justify-center">
        Search results
      </h3>

      <ul className="list list-movies searchResults w-100 mx-2  bg-opacity-25 grid grid-cols-1 md:grid-cols-2 ">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}
