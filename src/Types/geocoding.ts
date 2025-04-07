export interface GeocodingResult {
  geometry: {
    lat: number;
    lng: number;
  };
  formatted: string;
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
}
