import { ArrowRight } from "lucide-react";
import WeatherIcon from "../components/ui/WeatherIcon";
import WeatherCard from "../components/WeatherCard";
import useWeather from "../hooks/use-WeatherI";
import SearchMap from "../components/Search/SearchMap";

const Home = () => {
  const { weatherData, isLoading, error } = useWeather();

  if (isLoading) return <div className="text-center">Loading weather...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full min-h-screen ">
      <nav className="flex justify-between items-center">
        <SearchMap />
      </nav>

      <main className="flex flex-col md:grid md:grid-cols-6 items-center justify-center drop-shadow-text-effect max-w-6xl md:mx-auto md:gap-12 lg:gap-16 md:px-6 md:py-8 lg:py-4">
        <div className="w-full flex flex-col col-span-2 items-center max-sm:my-4 ">
          <WeatherIcon
            iconName={weatherData?.weather[0]?.icon || "01d"}
            size="clamp(9rem, 15vw, 12rem)"
          />
        </div>
        <WeatherCard weatherData={weatherData} />
      </main>

      <footer className="w-full max-w-6xl mx-auto flex justify-center pt-22 sm:pt-12 md:pt-0 pb-6 md:pb-11">
        <button className="flex items-center gap-3 text-tertiary cursor-pointer bg-secondary py-4 sm:py-4 md:py-5 px-5 sm:px-6 md:px-7 rounded-[20px] transition-all hover:opacity-90">
          Swap for Forecast report <ArrowRight />
        </button>
      </footer>
    </div>
  );
};

export default Home;
