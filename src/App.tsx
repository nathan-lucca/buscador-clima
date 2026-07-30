import { useWeather } from "./hooks/useWeather";
import { CitySelector } from "./components/CitySelector";
import { WeatherCard } from "./components/WeatherCard";
import { ErrorMessage } from "./components/ErrorMessage";

export default function App() {
  const { data, status, errorMsg, fetchWeather } = useWeather();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600
                    flex flex-col items-center justify-center px-4 gap-6"
    >
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold text-white">Clima Agora</h1>
        <p className="text-white/60 mt-1 text-sm">
          Selecione seu estado e cidade
        </p>
      </div>

      <CitySelector onSearch={fetchWeather} isLoading={status === "loading"} />

      {status === "loading" && (
        <p className="text-white/60 text-sm animate-pulse">Buscando...</p>
      )}

      {status === "error" && <ErrorMessage message={errorMsg} />}

      {status === "success" && data && <WeatherCard data={data} />}
    </div>
  );
}
