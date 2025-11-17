import { Search } from "lucide-react";
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
    <form onSubmit={handleBusca} className="relative w-full md:w-auto">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 
                   w-5 h-5 text-(--color-ja-vi-primary) pointer-events-none"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder=" Buscar filme ou série..."
        className="pl-10 pr-4 py-2 rounded-lg 
          text-sm text-(--color-ja-vi-primary)
          bg-(--color-ja-vi-secondary)
          focus:outline-none focus:ring-2 focus:ring-(--color-ja-vi-secondary)
          w-full"
      />

      <button type="submit" hidden aria-label="Buscar" />
    </form>
  );
};
