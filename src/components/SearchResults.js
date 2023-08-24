export default function SearchResults({ movies }) {
  return (
    <p className="num-results text-white text-center">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
