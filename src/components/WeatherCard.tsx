import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
      {/* Cidade e país */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">{data.city}</h2>
          <p className="text-white/60 text-sm mt-0.5">{data.country}</p>
        </div>
        <img
          src={iconUrl}
          alt={data.description}
          className="w-16 h-16 -mt-2 -mr-2"
        />
      </div>

      {/* Temperatura principal */}
      <div className="mt-4">
        <span className="text-7xl font-thin text-white">{data.temp}°</span>
        <span className="text-white/60 ml-1 text-lg">C</span>
      </div>

      {/* Descrição */}
      <p className="text-white/80 capitalize mt-1">{data.description}</p>

      {/* Divider */}
      <div className="border-t border-white/10 my-4" />

      {/* Detalhes */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wide">
            Sensação
          </p>
          <p className="text-white font-semibold mt-1">{data.feelsLike}°C</p>
        </div>
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wide">
            Umidade
          </p>
          <p className="text-white font-semibold mt-1">{data.humidity}%</p>
        </div>
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wide">Vento</p>
          <p className="text-white font-semibold mt-1">{data.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
}
