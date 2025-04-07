import { ForecastListItem } from "../Types/weather";
import WeatherIcon from "./ui/WeatherIcon";

const ForecastList = ({
  forecastList,
}: {
  forecastList: ForecastListItem[];
}) => {
  return (
    <ul className="h-80 space-y-2 overflow-y-scroll pr-4  scrollbar-show weahter-calendar">
      {forecastList.map((weatherData, index) => (
        <li
          key={index}
          className="flex justify-between py-4 md:bg-secondary/30 rounded-[10px] md:p-1"
        >
          <span className="text-xl font-normal">
            {`${new Date(weatherData?.dt * 1000).toLocaleDateString("en-US", {
              month: "short",
            })}, ${new Date(weatherData?.dt * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric" }
            )}`}
          </span>
          <WeatherIcon
            iconName={weatherData?.weather[0]?.icon || "01d"}
            size="3rem"
            disableMotion={true}
          />
          <span className="text-xl font-normal ">
            {weatherData?.main?.temp
              ? Math.round(weatherData.main.temp - 273.15)
              : "N/A"}
            °
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ForecastList;
