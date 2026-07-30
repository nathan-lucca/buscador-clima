# Buscador de Clima 🌤️

Aplicação que exibe o clima atual de qualquer cidade, com temperatura, sensação térmica, umidade e vento.

## Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Vite
- OpenWeatherMap API

## Funcionalidades

- Busca por nome de cidade
- Exibe temperatura atual, sensação térmica, umidade e velocidade do vento
- Tratamento de erros (cidade não encontrada, chave inválida)
- Loading state durante a requisição

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
│   ├── SearchBar.tsx      # Input + botão de busca
│   ├── WeatherCard.tsx    # Card com dados do clima
│   └── ErrorMessage.tsx   # Exibição de erros
├── hooks/
│   └── useWeather.ts      # Lógica de fetch e estados
├── types/
│   └── weather.ts         # Tipos TypeScript
└── App.tsx
```

## Deploy

[Ver projeto ao vivo](#) ← adicionar após deploy na Vercel

> ⚠️ Na Vercel, adicione `VITE_OPENWEATHER_API_KEY` em **Settings → Environment Variables**.