import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchForecast } from "../store/forecastSlice";
import { useLocation } from "../contexts/LocationContext";

const useForecast = () => {
  const dispatch = useAppDispatch();
  const { location } = useLocation();
  const { data, loading, error } = useAppSelector((state) => state.forecast);

  useEffect(() => {
    dispatch(fetchForecast({ lat: location.lat, lon: location.lon }));
  }, [dispatch, location]);

  return {
    forecastData: data,
    isLoading: loading,
    error,
  };
};

export default useForecast;
