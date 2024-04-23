import { forecastType } from "../types";

type Props = {
  data: forecastType;
};

const Forecast = ({ data }: Props): JSX.Element => {
  const todayWeather = data.list[0];

  return (
    <div className="w-[500px] md:max-w[400px] mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-3xl font-extrabold">
            {data.name}
            <span className="text-2xl font-extrabold bg-transparent">
              {data.country}
            </span>
          </h2>
          <h1 className=" text-5xl font-semibold">
            {Math.round(todayWeather.main.temp)}
          </h1>
        </section>
      </div>
    </div>
  );
};

export default Forecast;
