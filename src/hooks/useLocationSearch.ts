import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchWeather } from "../store/weatherSlice";
import { api } from "../../api/Index";
import { GeocodingResult } from "../Types/geocoding";
import debounce from "lodash/debounce";

export const useLocationSearch = (
  setLocation: (lat: number, lon: number, name: string) => void,
  addRecentSearch: (location: {
    lat: number;
    lon: number;
    name: string;
  }) => void
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const searchLocation = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.geocoding.search(query);
      setSearchResults(response.results);
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      searchLocation(query);
    }, 500),
    [searchLocation]
  );

  const handleLocationSelect = (result: GeocodingResult) => {
    const newLocation = {
      lat: result.geometry.lat,
      lon: result.geometry.lng,
      name: result.formatted,
    };
    setLocation(newLocation.lat, newLocation.lon, newLocation.name);
    addRecentSearch(newLocation);

    dispatch(
      fetchWeather({
        lat: result.geometry.lat,
        lon: result.geometry.lng,
      })
    );

    return newLocation;
  };

  const getCurrentLocation = () => {
    setIsLoading(true);

    if (!("geolocation" in navigator)) {
      console.error("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    const options = {
      timeout: 10000,
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await api.geocoding.reverse(
            position.coords.latitude,
            position.coords.longitude
          );

          if (!response.results?.length) {
            throw new Error("No location data found");
          }

          const result = response.results[0];
          handleLocationSelect({
            geometry: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            formatted: result.formatted,
          });
        } catch (error) {
          console.error("Error getting location:", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setIsLoading(false);
      },
      options
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    debouncedSearch,
    handleLocationSelect,
    getCurrentLocation,
  };
};
