import React, { useState } from "react";

const Kereses = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="kereses">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Keresés minden mezőben..."
        className="border px-3 py-2 rounded w-full sm:max-w-md"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="text-black border px-3 py-2 rounded hover:bg-gray-100"
          title="Keresés törlése"
        >
          ✕
        </button>
      )}
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Keresés
      </button>
    </form>
  );
};

export default Kereses;
