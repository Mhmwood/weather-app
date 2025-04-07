import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ForecastData } from "../Types/weather";
import { api } from "../../api/Index";

interface ForecastState {
  data: ForecastData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const data = await api.weather.getForecast(lat, lon);
    return data;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch forecast";
      });
  },
});

export default forecastSlice.reducer;
