import { Droplet, Wind } from "lucide-react";
import { WeatherData } from "../Types/weather";

interface WeatherCardProps {
  weatherData: WeatherData | null;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  const getFormattedDate = () => {
    if (!weatherData?.dt) return "Today";
    return new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="col-span-4 text-center bg-secondary/30 w-full max-sm:px-15 px-8 py-5 rounded-[20px] ">
      <nav className="text-2xl max-sm:text-xl whitespace-nowrap w-full mb-10">
        {getFormattedDate()}
      </nav>

      <div className="md:grid md:grid-cols-2 md:gap-1 space-y-10 md:space-y-0">
        <div>
          <h2 className="text-6xl max-sm:text-5xl md:text-7xl lg:text-8xl">
            {weatherData?.main?.temp
              ? Math.round(weatherData.main.temp)
              : "N/A"}
            °
          </h2>
          <h4 className="text-4xl md:text-5xl lg:text-6xl">
            {weatherData?.weather[0]?.main || "N/A"}
          </h4>
        </div>

        <ul className="text-2xl max-sm:text-xl space-y-5 font-medium">
          <li className="relative flex gap-5">
            <Wind />
            <span className="max-sm:border-r-2 pr-5 w-22 md:w-10">Wind</span>
            <span className="absolute -right-7 md:-right-7 ">
              {weatherData?.wind?.speed
                ? Math.round(weatherData.wind.speed * 3.6)
                : "N/A"}

              <span className=""> km/h</span>
            </span>
          </li>
          <li className="relative flex gap-5">
            <Droplet />
            <span className="max-sm:border-r-2 pr-5 w-22  md:w-10">Hum</span>
            <span className="absolute right-0">
              {weatherData?.main?.humidity || "N/A"} %
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;
