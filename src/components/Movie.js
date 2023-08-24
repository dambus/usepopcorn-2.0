export default function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      {/* <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
    */}
      <figure className="card h-40 bg-[#404040] m-2 flex flex-row">
        <img
          className="max-w-[30%] object-cover"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
        <div className="p-4">
          <h1 className="text-xl text-white font-bold w-100 mb-4">
            {movie.Title}
          </h1>
          <div>
            <p>
              <span className="text-gray-300">🗓</span>
              <span className=" text-gray-300">{movie.Year}</span>
            </p>
          </div>
        </div>
      </figure>
    </li>
  );
}
