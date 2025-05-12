import { useState } from "react";
import { forecastType } from "../types";
import { getSunTime } from "../utils/dataFunctions";
import TileCardComponent from "./TileCardComponent";

type Props = {
  data: forecastType;
  onGoBack: () => void;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>°</sup>
  </span>
);

const TemperatureConverter = ({
  celsiusTemp,
  isCelsius,
}: {
  celsiusTemp: number;
  isCelsius: boolean;
}): number => {
  return isCelsius ? celsiusTemp : (celsiusTemp * 9) / 5 + 32;
};
// allows me to write HTML-like code
const ForecastComponent = ({ data, onGoBack }: Props): JSX.Element => {
  const todayWeather = data.list[0];
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggleClick = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  return (
    <div className="weather-content w-full max-w-4xl mx-auto">
      <button
        onClick={onGoBack}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        aria-label="Go back to search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div className="container px-4 py-8 mx-auto">
        <section className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-extrabold">
            {data.name}
            <span className="ml-2 text-2xl font-extrabold bg-transparent">
              {data.country}
            </span>
          </h2>
          <h1 className="mb-4 text-5xl font-semibold">
            <Degree
              temp={Math.round(
                TemperatureConverter({
                  celsiusTemp: todayWeather.main.temp,
                  isCelsius,
                })
              )}
            />
          </h1>
          <p className="mb-2 text-lg">
            {todayWeather.weather[0].main} {todayWeather.weather[0].description}
          </p>
          <p className="mb-4 text-sm">
            Hi:{" "}
            <Degree
              temp={Math.ceil(
                TemperatureConverter({
                  celsiusTemp: todayWeather.main.temp_max,
                  isCelsius,
                })
              )}
            />{" "}
            Lo:{" "}
            <Degree
              temp={Math.floor(
                TemperatureConverter({
                  celsiusTemp: todayWeather.main.temp_min,
                  isCelsius,
                })
              )}
            />
          </p>
          <button
            className="px-4 py-2 font-bold text-white transition-colors bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleToggleClick}
          >
            {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
          </button>
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm">
              <span>Sunrise: {getSunTime(data.sunrise)}</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm">
              <span>Sunset: {getSunTime(data.sunset)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 justify-items-center">
            <TileCardComponent
              title="Wind"
              info={`${Math.round(todayWeather.wind.speed)} km/h`}
            />
            <TileCardComponent
              title="Feels like"
              info={<Degree temp={Math.round(todayWeather.main.feels_like)} />}
            />
            <TileCardComponent
              title="Humidity"
              info={`${todayWeather.main.humidity} %`}
            />
            <TileCardComponent
              title="Visibility"
              info={`${(todayWeather.visibility / 1000).toFixed()} km`}
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-center">Weather by Hour (3h)</h2>
          <div className="flex gap-4 pb-4 overflow-x-auto">
            {data.list.map((item, i) => (
              <div
                className="flex-shrink-0 w-20 p-2 text-center rounded-lg bg-white/20 backdrop-blur-sm"
                key={i}
              >
                <p className="font-semibold">
                  {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="mx-auto"
                />
                <p>
                  <Degree
                    temp={Math.round(
                      TemperatureConverter({
                        celsiusTemp: item.main.temp,
                        isCelsius,
                      })
                    )}
                  />
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-center">Weather by Date</h2>
          <div className="flex gap-4 pb-4 overflow-x-auto">
            {data.list.map((item, i) => (
              <div
                className="flex-shrink-0 w-20 p-2 text-center rounded-lg bg-white/20 backdrop-blur-sm"
                key={i}
              >
                <p className="font-semibold">
                  {i === 0 ? "Today" : new Date(item.dt * 1000).getDate()}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="mx-auto"
                />
                <p>
                  <Degree
                    temp={Math.round(
                      TemperatureConverter({
                        celsiusTemp: item.main.temp,
                        isCelsius,
                      })
                    )}
                  />
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForecastComponent;

//Daniel Notes
//Could have split up the components in here
