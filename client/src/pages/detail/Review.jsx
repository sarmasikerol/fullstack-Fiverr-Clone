import moment from "moment";
import { FaStar } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Review = ({ item }) => {
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);
  const arr = new Array(Math.round(item?.star)).fill();

  const isOwn = item.user._id === user._id;

  const { isPending, mutate } = useMutation({
    mutationFn: () => api.delete(`/review/${item._id}`),
    onSuccess: () => {
      toast.warning("Yorum silindi");
      // yorum ve hizmet veirlerini tekrar al
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["gig"]);
    },
  });

  return (
    <div className="flex flex-col gap-5 py-10 border-b relative">
      {isOwn && (
        <button
          onClick={mutate}
          disabled={isPending}
          className="absolute top-12 right-1 p-2 bg-red-500  text-white rounded-md"
        >
          <FaTrashAlt className="" />
        </button>
      )}

      <div className="flex gap-5">
        <img
          src={item.user.photo}
          className="size-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">{item.user.username}</h4>
          <p>{item.user.country}</p>
        </div>
      </div>

      <div className="flex items-center">
        {arr.map((i, key) => (
          <FaStar key={key} />
        ))}
        <span className="ms-1 me-3">{item.star}</span>
        <span className="text-sm text-gray-500">
          {moment(item.createdAt).fromNow()}
        </span>
      </div>

      <p>{item.desc}</p>

      <div className="flex gap-5">
        <span>Yardımcı oldu mu ? </span>

        <button className="flex gap-1 items-center">
          <AiOutlineLike />
          Evet
        </button>
        <button className="flex gap-1 items-center">
          <AiOutlineDislike />
          Hayır
        </button>
      </div>
    </div>
  );
};

export default Review;
