import { useState, useEffect, useRef } from "react";

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

interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}

function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all outline-none ${disabled ? "bg-white/5 border-white/10 text-white/30 cursor-not-allowed" : "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/40 cursor-pointer"} ${open ? "border-white/50 bg-white/15" : ""}`}
      >
        <span className={selected ? "text-white" : "text-white/50"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 rounded-xl border border-white/20 bg-blue-900/95 backdrop-blur-md overflow-hidden shadow-2xl">
          <ul className="max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${opt.value === value ? "bg-white/20 text-white font-medium" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
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

  const estadoOptions = estados.map((e) => ({
    value: e.sigla,
    label: `${e.nome} (${e.sigla})`,
  }));

  const cidadeOptions = cidades.map((c) => ({ value: c.nome, label: c.nome }));

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <Dropdown
        value={ufSelecionada}
        onChange={setUfSelecionada}
        options={estadoOptions}
        placeholder={
          loadingEstados ? "Carregando estados..." : "Selecione o estado..."
        }
        disabled={loadingEstados || isLoading}
      />

      <Dropdown
        value={cidadeSelecionada}
        onChange={setCidadeSelecionada}
        options={cidadeOptions}
        placeholder={
          loadingCidades ? "Carregando cidades..." : "Selecione a cidade..."
        }
        disabled={!ufSelecionada || loadingCidades || isLoading}
      />

      <button
        onClick={() => cidadeSelecionada && onSearch(cidadeSelecionada)}
        disabled={!cidadeSelecionada || isLoading}
        className="w-full py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Buscando..." : "Ver clima"}
      </button>
    </div>
  );
}
