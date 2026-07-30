export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export type FetchStatus = "idle" | "loading" | "success" | "error";
