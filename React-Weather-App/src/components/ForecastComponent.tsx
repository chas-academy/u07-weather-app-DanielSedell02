import { useState, useMemo } from "react";
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

  // Process data to get daily averages
  const dailyForecast = useMemo(() => {
    const dailyData = new Map<string, {
      temps: number[];
      weather: { main: string; icon: string; description: string }[];
      date: Date;
    }>();

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];
      
      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, {
          temps: [],
          weather: [],
          date: date
        });
      }
      
      const dayData = dailyData.get(dateKey)!;
      dayData.temps.push(item.main.temp);
      dayData.weather.push(item.weather[0]);
    });

    return Array.from(dailyData.entries())
      .map(([, data]) => ({
        date: data.date,
        avgTemp: data.temps.reduce((a, b) => a + b, 0) / data.temps.length,
        weather: data.weather.reduce((prev, curr) => {
          const prevCount = data.weather.filter(w => w.main === prev.main).length;
          const currCount = data.weather.filter(w => w.main === curr.main).length;
          return currCount > prevCount ? curr : prev;
        })
      }))
      .slice(0, 5); // Limit to 5 days
  }, [data.list]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <button
        onClick={onGoBack}
        className="absolute -left-16 top-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
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
      <div className="weather-content w-full bg-white/20 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="container px-4 py-8 mx-auto">
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

          {/* 5-Day forecast section */}
          <section className="mt-8 flex justify-center">
            <div className="border-2 border-white/40 rounded-xl bg-white/10 backdrop-blur-md px-6 py-4 w-full max-w-2xl">
              <h2 className="mb-4 text-xl font-bold text-center">5-Day Forecast</h2>
              <div className="flex gap-6 justify-center">
                {dailyForecast.map((day, index) => (
                  <div
                    key={index}
                    className="w-28 p-3 text-center rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30"
                  >
                    <p className="font-semibold mb-1 text-sm">{formatDate(day.date)}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                      alt={day.weather.description}
                      className="mx-auto mb-1 w-12 h-12"
                    />
                    <p className="text-lg font-bold">
                      <Degree
                        temp={Math.round(
                          TemperatureConverter({
                            celsiusTemp: day.avgTemp,
                            isCelsius,
                          })
                        )}
                      />
                    </p>
                    <p className="text-xs mt-1 text-white/80">
                      {day.weather.main}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ForecastComponent;

//Daniel Notes
//Could have split up the components in here
