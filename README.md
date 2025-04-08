# Weather App

A modern weather application built with React, TypeScript, and Vite that provides real-time weather information.

## Features

- Real-time weather data display
- Search for weather by city name
- Responsive design
- Temperature in Celsius/Fahrenheit
- Weather conditions and forecasts
- Clean and intuitive user interface

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS (for styling and responsive design)
- Framer Motion (for smooth animations and transitions)
- Axios (for HTTP requests)
- Weather API (specify which one you're using)
- Geocoding API (for location coordinates lookup)
- Netlify Functions (for API key security and backend functionality)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Mhmwood/weather-app.git
```

2. Navigate to the project directory

```bash
cd weather-app
```

3. Install dependencies

```bash
npm install
# or
yarn install

```

4. Create a `.env` or `.env.local` file in the root directory and add your API key

```bash
OPENCAGE_API_KEY=your_api_key_here
WEATHER_API_KEY=your_api_key_here
```

5. Deploy Netlify Functions (for local development)

```bash
netlify dev
```

6. Start the development server

```bash
npm run dev
# or
yarn dev
```

## Usage

1. Enter a city name in the search bar
2. View the current weather conditions
3. Check the forecast for upcoming days

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
