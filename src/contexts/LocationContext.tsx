//location context

"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface LocationContextType {
  location: {
    lat: number;
    lon: number;
    name: string;
  };
  setLocation: (lat: number, lon: number, name: string) => void;
  recentSearches: Array<{ lat: number; lon: number; name: string }>;
  addRecentSearch: (location: {
    lat: number;
    lon: number;
    name: string;
  }) => void;
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextType>({
  location: { lat: 0, lon: 0, name: "Loading..." },
  setLocation: () => {},
  recentSearches: [],
  addRecentSearch: () => {},
  isLoading: true,
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocationState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastLocation");
      return saved ? JSON.parse(saved) : { lat: 0, lon: 0, name: "Loading..." };
    }
    return { lat: 0, lon: 0, name: "Loading..." };
  });

  const [recentSearches, setRecentSearches] = useState<
    Array<{ lat: number; lon: number; name: string }>
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const savedLocation = localStorage.getItem("lastLocation");
    if (savedLocation) {
      const { lat, lon, name } = JSON.parse(savedLocation);
      setLocation(lat, lon, name);
    } else {
      setLocation(0, 0, "Default Location");
    }
    setIsLoading(false);
  }, []); // Run only once when component mounts

  const setLocation = (lat: number, lon: number, name: string) => {
    const newLocation = { lat, lon, name };
    setLocationState(newLocation);
    localStorage.setItem("lastLocation", JSON.stringify(newLocation));
  };

  const addRecentSearch = (newLocation: {
    lat: number;
    lon: number;
    name: string;
  }) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((loc) => loc.name !== newLocation.name);
      const updated = [newLocation, ...filtered].slice(0, 3);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        recentSearches,
        addRecentSearch,
        isLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
