# Buscador de Clima 🌤️

Aplicação que exibe o clima atual de qualquer cidade do Brasil, com temperatura, sensação térmica, umidade e vento.

## Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Vite
- OpenWeatherMap API
- IBGE API (estados e municípios)

## Funcionalidades

- Seleção de estado via API do IBGE (27 estados)
- Seleção de cidade com todos os municípios do estado selecionado
- Dropdowns customizados (sem select nativo)
- Exibe temperatura atual, sensação térmica, umidade e velocidade do vento
- Tratamento de erros (cidade não encontrada, chave inválida)
- Loading state durante as requisições

## Como rodar localmente

```bash
npm install
```

Crie um arquivo `.env` na raiz com sua chave da OpenWeatherMap:

```
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

```bash
npm run dev
```

## Estrutura do projeto

```
src/
├── components/
│   ├── CitySelector.tsx   # Dropdowns de estado e cidade (IBGE API)
│   ├── WeatherCard.tsx    # Card com dados do clima
│   └── ErrorMessage.tsx   # Exibição de erros
├── hooks/
│   └── useWeather.ts      # Lógica de fetch e estados
├── types/
│   └── weather.ts         # Tipos TypeScript
└── App.tsx
```

## Deploy

[Ver projeto ao vivo](https://buscador-clima-orcin.vercel.app/)

> ⚠️ Na Vercel, adicione `VITE_OPENWEATHER_API_KEY` em **Settings → Environment Variables**.
