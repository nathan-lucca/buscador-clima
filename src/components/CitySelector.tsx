import { useState, useEffect } from "react";

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

interface CitySelectorProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function CitySelector({ onSearch, isLoading }: CitySelectorProps) {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [ufSelecionada, setUfSelecionada] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
    )
      .then((r) => r.json())
      .then((data: Estado[]) => setEstados(data))
      .finally(() => setLoadingEstados(false));
  }, []);

  useEffect(() => {
    if (!ufSelecionada) return;
    setCidades([]);
    setCidadeSelecionada("");
    setLoadingCidades(true);

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios?orderBy=nome`,
    )
      .then((r) => r.json())
      .then((data: Cidade[]) => setCidades(data))
      .finally(() => setLoadingCidades(false));
  }, [ufSelecionada]);

  function handleBuscar() {
    if (cidadeSelecionada) onSearch(cidadeSelecionada);
  }

  const selectClass = `
    w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
    text-white outline-none cursor-pointer transition-all
    focus:border-white/50 focus:bg-white/15
    disabled:opacity-40 disabled:cursor-not-allowed
  `;

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <select
        value={ufSelecionada}
        onChange={(e) => setUfSelecionada(e.target.value)}
        disabled={loadingEstados || isLoading}
        className={selectClass}
        style={{ colorScheme: "dark" }}
      >
        <option value="" disabled>
          {loadingEstados ? "Carregando estados..." : "Selecione o estado..."}
        </option>
        {estados.map((e) => (
          <option key={e.id} value={e.sigla}>
            {e.nome} ({e.sigla})
          </option>
        ))}
      </select>

      <select
        value={cidadeSelecionada}
        onChange={(e) => setCidadeSelecionada(e.target.value)}
        disabled={!ufSelecionada || loadingCidades || isLoading}
        className={selectClass}
        style={{ colorScheme: "dark" }}
      >
        <option value="" disabled>
          {loadingCidades ? "Carregando cidades..." : "Selecione a cidade..."}
        </option>
        {cidades.map((c) => (
          <option key={c.id} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </select>

      <button
        onClick={handleBuscar}
        disabled={!cidadeSelecionada || isLoading}
        className="w-full py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Buscando..." : "Ver clima"}
      </button>
    </div>
  );
}
