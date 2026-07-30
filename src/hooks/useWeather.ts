import { useState } from "react";
import type { WeatherData, FetchStatus } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchWeather(city: string) {
    if (!city.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`,
      );

      if (!res.ok) {
        if (res.status === 404) throw new Error("Cidade não encontrada.");
        if (res.status === 401) throw new Error("Chave de API inválida.");
        throw new Error("Erro ao buscar dados. Tente novamente.");
      }

      const json = await res.json();

      setData({
        city: json.name,
        country: json.sys.country,
        temp: Math.round(json.main.temp),
        feelsLike: Math.round(json.main.feels_like),
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
        description: json.weather[0].description,
        icon: json.weather[0].icon,
      });

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido.");
      setStatus("error");
      setData(null);
    }
  }

  return { data, status, errorMsg, fetchWeather };
}
