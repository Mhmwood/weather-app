//api index

import axios from "axios";

export const api = {
  geocoding: {
    search: async (query: string) => {
      const response = await axios.post("/.netlify/functions/GeocodingApi", {
        type: "search",
        query,
      });
      return response.data;
    },
    reverse: async (lat: number, lon: number) => {
      const response = await axios.post("/.netlify/functions/GeocodingApi", {
        type: "reverse",
        lat,
        lon,
      });
      return response.data;
    },
  },

  weather: {
    getByCoordinates: async (lat: number, lon: number) => {
      const response = await axios.post("/.netlify/functions/WeatherApi", {
        type: "current",
        lat,
        lon,
      });
      return response.data;
    },
    getForecast: async (lat: number, lon: number) => {
      const response = await axios.post("/.netlify/functions/WeatherApi", {
        type: "forecast",
        lat,
        lon,
      });
      return response.data;
    },
  },
};
