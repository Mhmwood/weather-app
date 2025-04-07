import { CalendarDays, ChevronLeft, SunDim } from "lucide-react";

import "./index.css";
import ForecastList from "../../components/ForecastList";
import useForecast from "../../hooks/use-Forecast";
import WeatherIcon from "../../components/ui/WeatherIcon";

const Detail = () => {
  const { forecastData, isLoading, error } = useForecast();
  const handleScrollRight = () => {
    window.scrollBy({
      left: 100,
      behavior: "smooth",
    });
  };

  if (isLoading) return <div className="text-center">Loading weather...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full  drop-shadow-text-effect  font-mediumdrop-shadow-text-effect  font-medium">
      <nav className="items-center   ">
        <button
          className="flex items-center gap-x-5 cursor-pointer"
          onClick={handleScrollRight}
        >
          <ChevronLeft />
          <h4 className="text-3xl mt-2">Swap to Back</h4>
        </button>
      </nav>
      <main className=" mt-5 space-y-24 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8">
        <div className="space-y-4 md:space-y-5 ">
          <div className=" flex justify-between  ">
            <span className="  text-2xl  font-black">Today</span>
            <span className=" text-xl font-normal">
              {forecastData?.list[0]?.dt
                ? `${new Date(
                    forecastData.list[0].dt * 1000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                  })}, ${new Date(
                    forecastData.list[0].dt * 1000
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                  })}`
                : "Loading..."}
            </span>
          </div>
          <div className="flex justify-between  md:flex-wrap  md:gap-1 lg:gap-3 md:justify-center   ">
            {forecastData?.list.slice(0, 5).map((weatherData, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-6 size-27  md:space-y-0 md:bg-secondary/30 rounded-[10px]  transition-all duration-300 md:p-1  "
              >
                <span className="text-xl font-normal">
                  {weatherData?.main?.temp
                    ? Math.round(weatherData.main.temp - 273.15)
                    : "N/A"}
                  °C
                </span>
                <WeatherIcon
                  iconName={weatherData?.weather[0]?.icon || "01d"}
                  size="3rem"
                  disableMotion={true}
                />
                <span className="text-xl font-normal md:text-md">
                  {(weatherData.wind.speed * 2.237).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 md:space-y-4">
          <div className=" flex justify-between ">
            <span className="  text-2xl  font-black">Next Forecast</span>

            <CalendarDays />
          </div>
          <ForecastList forecastList={forecastData?.list || []} />
        </div>
      </main>

      <footer className=" py-4  md:pt-[100px] md:pb-11 flex justify-center">
        <span className=" flex items-center text-2xl font-black">
          <SunDim className="size-6 mr-3 fill-secondary" />
          AccuWeather
        </span>
      </footer>
    </div>
  );
};

export default Detail;
