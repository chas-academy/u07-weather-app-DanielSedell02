import { JSX } from "react";

type Props = {
  title: string;
  info: string | JSX.Element;
};

const TileCardComponent = ({ title, info }: Props): JSX.Element => {
  return (
    <article className="w-full bg-white/20 backdrop-blur-sm rounded-lg shadow-md p-4 text-center transition-transform hover:scale-105">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <h4 className="text-xl font-bold text-white">{info}</h4>
      </div>
    </article>
  );
};

export default TileCardComponent;
