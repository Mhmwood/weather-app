// src/hooks/useWeather.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchWeather } from "../store/weatherSlice";
import { useLocation } from "../contexts/LocationContext";

const useWeather = () => {
  const dispatch = useAppDispatch();
  const { location } = useLocation();
  const { data, loading, error } = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather({ lat: location.lat, lon: location.lon }));
  }, [dispatch, location]);

  console.log(data);  

  return {
    weatherData: data,
    isLoading: loading,
    error,
  };
};

export default useWeather;
