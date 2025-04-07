//  weatherSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData, WeatherState } from "../Types/weather";
import { api } from "../../api/Index";

export const fetchWeather = createAsyncThunk<
  WeatherData,
  { lat: number; lon: number },
  { rejectValue: string }
>("weather/fetchWeather", async ({ lat, lon }, { rejectWithValue }) => {
  try {
    const data = await api.weather.getByCoordinates(lat, lon);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;
