import { Handler } from "@netlify/functions";
import axios from "axios";
import { WeatherData, ForecastData } from "../../src/Types/weather";
import dotenv from "dotenv";

dotenv.config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const handler: Handler = async (event) => {
  if (!process.env.WEATHER_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Weather API key is not configured",
        env: process.env.NODE_ENV,
      }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing request body" }),
    };
  }

  const { type, lat, lon } = JSON.parse(event.body);

  try {
    if (type === "current") {
      const response = await axios.get<WeatherData>(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            appid: process.env.WEATHER_API_KEY,
            units: "metric", // Optional: for Celsius
          },
        }
      );
      return {
        statusCode: 200,

        body: JSON.stringify(response.data),
      };
    } else if (type === "forecast") {
      const response = await axios.get<ForecastData>(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            lat,
            lon,
            cnt: 20,
            appid: WEATHER_API_KEY,
          },
        }
      );
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response.data),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request type" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch weather data",
        details: error.message,
      }),
    };
  }
};

export { handler };
