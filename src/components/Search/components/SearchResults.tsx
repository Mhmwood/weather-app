import { GeocodingResult, Location } from "../../../Types/geocoding";

interface SearchResultsProps {
  searchResults: GeocodingResult[];
  recentSearches: Location[];
  searchTerm: string;
  onLocationSelect: (result: GeocodingResult) => void;
}

const SearchResults = ({
  searchResults,
  recentSearches,
  searchTerm,
  onLocationSelect,
}: SearchResultsProps) => {
  return (
    <div className="absolute top-full mt-2 left-0 w-full bg-[#ffffff] rounded-2xl shadow-xl p-4 border border-gray-100 z-50">
      {recentSearches.length > 0 && !searchTerm && (
        <div>
          <h3 className="text-sm font-medium text-[#838baa]">
            Recent Searches
          </h3>
          <div>
            {recentSearches.map((recent, index) => (
              <button
                key={index}
                onClick={() =>
                  onLocationSelect({
                    geometry: { lat: recent.lat, lng: recent.lon },
                    formatted: recent.name,
                  })
                }
                className="w-full text-left px-4 py-2 hover:bg-[#49a4f2]/10 transition-colors text-[#444e72]"
              >
                {recent.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div
          className={`${
            !searchTerm && recentSearches.length > 0
              ? "border-t border-gray-100"
              : ""
          }`}
        >
          <div className="max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => onLocationSelect(result)}
                className="w-full text-left px-4 py-2 hover:bg-[#49a4f2]/10 transition-colors text-[#444e72]"
              >
                {result.formatted}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
