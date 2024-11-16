import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Info from "./info";
import UserInfo from "./UserInfo";
import OrderBox from "./OrderBox";
import Reviews from "./Reviews";

const Detail = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: "gig",
    queryFn: () => api.get(`/gigs/${id}`).then((res) => res.data.gig),
  });
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} retry={refetch} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div>
            <Info data={data} />
            <UserInfo user={data.user} />
            <Reviews gigId={id} avgRating={data.avgRating}/>
          </div>

          <OrderBox data={data}/>
        </div>
      )}
    </div>
  );
};

export default Detail;
