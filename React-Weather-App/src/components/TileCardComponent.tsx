import Wind from "./Icons/Wind";

type Props = {
  icon: "wind" | "feels" | "humidity" | "visibility";
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: Wind,
  // feels: Feels,
  // humidity: Humidity,
  // visibility: visibility,
};

const TileCardComponent = ({ icon, title, info }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className="w-[140px] h-[130px] bg-slate-400 backdrop-ls">
      <div className="flex items-center space-x-2">
        <Icon /> <h3>{title}</h3>
      </div>
      <h4>{info}</h4>
    </article>
  );
};

export default TileCardComponent;
