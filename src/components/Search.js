export default function Search({ query, setQuery }) {
  return (
    <div className="search w-full p-4 text-center mt-4">
      <input
        className="search w-[1/2] sm:w-[3/4] mx-auto bg-white p-4 text-base text-[#533D7B] rounded-2xl outline-none h-[2rem]"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
