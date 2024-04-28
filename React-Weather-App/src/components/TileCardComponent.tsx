import { JSX } from "react";

type Props = {
  title: string;
  info: string | JSX.Element;
  description: string;
};

const TileCardComponent = ({ title, info }: Props): JSX.Element => {
  return (
    <article className="w-[110px] h-[120px] bg-gray-700 backdrop-ls rounded-lg shadow-md font-bold mr-4 mb-4">
      <div className="flex items-center text-center space-x-2">
        <h3>{title}</h3>
      </div>
      <h4>{info}</h4>
    </article>
  );
};

export default TileCardComponent;
