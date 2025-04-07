import { ChevronDown, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "../../contexts/LocationContext";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import SearchResults from "./components/SearchResults";

const SearchMap = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { location, setLocation, recentSearches, addRecentSearch } =
    useLocation();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    debouncedSearch,
    handleLocationSelect,
    getCurrentLocation,
  } = useLocationSearch(setLocation, addRecentSearch);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchContainerRef}>
      <div className="relative">
        <h4
          className={`absolute left-12 top-1/2 -translate-y-1/2 text-lg font-semibold text-[#444e72] truncate max-w-[200px] md:max-w-[350px] pointer-events-none ${
            showSearch ? "opacity-0" : "opacity-100"
          }`}
        >
          {location.name}
        </h4>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSearch(true);
          }}
          onClick={() => {
            setSearchTerm("");
            setShowSearch(true);
          }}
          placeholder={showSearch ? "Search location..." : ""}
          className={`w-full px-4 py-3 pl-12 pr-12 rounded-full outline-none transition-all text-[#444e72] placeholder-[#838baa] bg-white ${
            !showSearch ? "text-transparent" : ""
          }`}
        />
        <MapPin
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#49a4f2] active:text-green-500 z-50 cursor-pointer"
          onClick={getCurrentLocation}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#49a4f2]" />
          ) : (
            <ChevronDown
              className={`text-[#838baa] transition-transform duration-200 ${
                showSearch ? "rotate-180" : ""
              }`}
              onClick={() => setShowSearch(!showSearch)}
            />
          )}
        </div>
      </div>

      {showSearch && (
        <SearchResults
          searchResults={searchResults}
          recentSearches={recentSearches}
          searchTerm={searchTerm}
          onLocationSelect={(result) => {
            handleLocationSelect(result);
            setShowSearch(false);
            setSearchTerm("");
          }}
        />
      )}
    </div>
  );
};

export default SearchMap;
