import { JSX } from "react";

type Props = {
  title: string;
  info: string | JSX.Element;
};

const TileCardComponent = ({ title, info }: Props): JSX.Element => {
  return (
    <article className="w-[120px] h-[120px] bg-light-blue-700 backdrop-ls rounded-lg shadow-md font-bold mr-5 mb-6 flex justify-center items-center">
      <div className="flex items-center text-center justify-center ">
        <h3 className=" mr-2">{title}</h3>
      </div>
      <h4>{info}</h4>
    </article>
  );
};

export default TileCardComponent;
