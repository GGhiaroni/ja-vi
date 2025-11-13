import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BarraDePesquisa: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleBusca}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filme ou série..."
        className="px-4 py-2 rounded-md 
          text-sm text-black 
          bg-white bg-opacity-80
          focus:outline-none focus:ring-2 focus:ring-(--color-ja-vi-secondary)
          w-full md:w-auto"
      />
    </form>
  );
};
