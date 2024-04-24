import { forecastType } from "../types";
import { getSunTime } from "../utils/dataFunctions";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>°</sup>
  </span>
);

const ForecastComponent = ({ data }: Props): JSX.Element => {
  const todayWeather = data.list[0];

  return (
    <div className="w-[900px] md:max-w[400px] mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-[700px]">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-3xl font-extrabold">
            {data.name}
            <span className="text-2xl font-extrabold bg-transparent">
              {data.country}
            </span>
          </h2>
          <h1 className=" text-5xl font-semibold">
            <Degree temp={Math.round(todayWeather.main.temp)} />
          </h1>
          <p>
            {todayWeather.weather[0].main} {todayWeather.weather[0].description}
          </p>
          <p className="text-sm">
            Hi: <Degree temp={Math.ceil(todayWeather.main.temp_max)} /> Lo:
            {""}
            <Degree temp={Math.floor(todayWeather.main.temp_min)} />
          </p>
        </section>

        <section>
          <p>Sun time: {getSunTime(data.sunrise)}</p>
          <p>Sun time: {getSunTime(data.sunset)}</p>
        </section>

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
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

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
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ForecastComponent;