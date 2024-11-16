import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Info = ({ data }) => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <p className="flex gap-3 items-center text-gray-500">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        / <span>{data.category}</span>
      </p>

      <h1 className="font-bold text-xl md:text-2xl">{data.title}</h1>

      <div className="flex gap-3 items-center">
        <img className="size-12 rounded-full" src={data.user.photo} />

        <div>
          <h4 className="font-bold">{data.user.username}</h4>

          <div className="flex gap-1 items-center">
            <FaStar />
            <span className="font-semibold">4.8</span>
          </div>
        </div>
      </div>

      <Splide>
        {data.images.map((url, key) => (
          <SplideSlide key={key}>
            <img className="h-[30vh] w-full object-contain" src={url} />
          </SplideSlide>
        ))}
      </Splide>

      <div>
        <h1 className="font-bold text-lg mt-10 mb-3">
          Bu Hizmet Hakkında
        </h1>
        <p>{data.desc}</p>
      </div>
    </div>
  );
};

export default Info;
