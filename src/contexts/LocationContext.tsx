//location context

"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../../api/Index";

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

  const [hasPromptedForLocation, setHasPromptedForLocation] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hasPromptedForLocation") === "true";
    }
    return false;
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
    const getLocation = async () => {
      if ("geolocation" in navigator) {
        let shouldRequestLocation = false;

        if (!hasPromptedForLocation) {
          const userResponse = window.confirm(
            "This website would like to access your location to provide better service. Do you allow?"
          );
          setHasPromptedForLocation(true);
          localStorage.setItem("hasPromptedForLocation", "true");
          shouldRequestLocation = userResponse;
        } else {
          // If we've prompted before, check if we have a saved location
          const savedLocation = localStorage.getItem("lastLocation");
          if (!savedLocation) {
            shouldRequestLocation = true;
          }
        }

        if (shouldRequestLocation) {
          setIsLoading(true);
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await api.geocoding.search(
                  `${latitude}+${longitude}`
                );
                if (response.results && response.results[0]) {
                  const result = response.results[0];
                  const city =
                    result.components?.city ||
                    result.components?.town ||
                    result.components?.village ||
                    "";
                  const country = result.components?.country || "";
                  const locationName = `${city}, ${country}`.trim();
                  setLocation(latitude, longitude, locationName);
                }
              } catch (error) {
                console.error("Error getting location name:", error);
                setLocation(latitude, longitude, "Unknown Location");
              } finally {
                setIsLoading(false);
              }
            },
            (error) => {
              console.error("Error getting user location:", error);
              setLocation(0, 0, "Location access denied");
              setIsLoading(false);
            }
          );
        } else {
          setIsLoading(false);
        }
      } else {
        setLocation(0, 0, "Geolocation not supported");
        setIsLoading(false);
      }
    };

    getLocation();
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
