import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite o nome da cidade..."
        disabled={isLoading}
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all"
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "..." : "Buscar"}
      </button>
    </form>
  );
}
