import { useState } from "react";
import { forecastType } from "../types";
import { getSunTime } from "../utils/dataFunctions";
import TileCardComponent from "./TileCardComponent";

type Props = {
  data: forecastType;
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
const ForecastComponent = ({ data }: Props): JSX.Element => {
  const todayWeather = data.list[0];
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggleClick = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  return (
    <div className="w-[900px] md:max-w[400px] mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-auto">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-3xl font-extrabold">
            {data.name}
            <span className="text-2xl font-extrabold bg-transparent">
              {data.country}
            </span>
          </h2>
          <h1 className=" text-5xl font-semibold">
            <Degree
              temp={Math.round(
                TemperatureConverter({
                  celsiusTemp: todayWeather.main.temp,
                  isCelsius,
                })
              )}
            />
          </h1>
          <p>
            {todayWeather.weather[0].main} {todayWeather.weather[0].description}
          </p>
          <p className="text-sm">
            Hi:{" "}
            <Degree
              temp={Math.ceil(
                TemperatureConverter({
                  celsiusTemp: todayWeather.main.temp_max,
                  isCelsius,
                })
              )}
            />{" "}
            Lo:
            {""}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleToggleClick}
          >
            {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
          </button>
        </section>

        <section className="section-3">
          <div className=" flex flex-wrap section-3-icons justify-center space-x-5">
            <div>
              <span>Sun time: {getSunTime(data.sunrise)}</span>
            </div>
            <div>
              <span>Sunset: {getSunTime(data.sunset)}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center">
            <TileCardComponent
              title="Wind"
              // rounds up the number
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
        {/* Weather by hour */}
        {/* Could have done this one better */}
        <h2 className="mg-8 text-center font-bold">Weather by Hour (3h)</h2>
        <section className="flex overflow-x-scroll text-center items-center">
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center flex-shrink-0 w-[75px]"
              key={i}
            >
              <p> {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
              <img
                src={` https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
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
        </section>
        {/* Weather by date */}
        <h2 className="mg-8 text-center font-bold">Weather by Date</h2>
        <section className="flex overflow-x-scroll text-center items-center">
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center flex-shrink-0 w-[75px]"
              key={i}
            >
              <p> {i === 0 ? "Today" : new Date(item.dt * 1000).getDate()}</p>
              <img
                src={` https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
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
        </section>
      </div>
    </div>
  );
};

export default ForecastComponent;

//Daniel Notes
//Could have split up the components in here
