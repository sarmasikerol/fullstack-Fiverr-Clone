import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Review from "./Review";
import { toast } from "react-toastify";

const Reviews = ({ gigId, avgRating }) => {
  const queryClient = useQueryClient();

  // bütün yorumları al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      api.get(`/review/${gigId}`).then((res) => res.data.reviews),
  });

  // yeni yorum gönder
  const { isPending, mutate } = useMutation({
    mutationFn: (newReview) => {
      return api.post("/review", newReview);
    },

    onSuccess: () => {
      toast.success("Yorum Gönderildi");
      // yorum ve hizmet veirlerini tekrar al
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["gig"]);
    },
  });

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // yıldız inputlarından bir dizi oluştur
    const arr = [
      e.target[0],
      e.target[1],
      e.target[2],
      e.target[3],
      e.target[4],
    ];

    // dizideki inputlardan checked = true olanı bul
    const found = arr.find((inp) => inp.checked == true);

    // yorum nesnesi oluştur
    const newComment = {
      star: found.value,
      desc: e.target[5].value,
      gigId,
    };

    // post iteğini at
    mutate(newComment);

    // formu sıfırla
    e.target.reset();
  };

  return (
    <div>
      <h1 className="font-semibold text-lg">Yorumlar</h1>

      <p className="font-semibold my-2">
        Bu hizmet için {data?.length} yorum atıldı
      </p>

      <p>
        Ortalama: <span className="font-semibold">{avgRating}</span>
      </p>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col my-5">
          <label>Deneyiminizi Puanlayın</label>

          <div className="flex">
            <div className="rating">
              <input value="5" name="rating" id="star5" type="radio" />
              <label htmlFor="star5"></label>
              <input value="4" name="rating" id="star4" type="radio" />
              <label htmlFor="star4"></label>
              <input value="3" name="rating" id="star3" type="radio" />
              <label htmlFor="star3"></label>
              <input value="2" name="rating" id="star2" type="radio" />
              <label htmlFor="star2"></label>
              <input value="1" name="rating" id="star1" type="radio" />
              <label htmlFor="star1"></label>
            </div>
          </div>

          <label className="mt-2">Yorum Yazın</label>

          <input
            className="border p-2 rounded-md shadow mt-2"
            type="text"
            placeholder="açıklama..."
          />

          <div className="flex justify-end">
            <button
              disabled={isPending}
              className="bg-green-500 rounded-md p-2 px-3 font-bold text-white mt-3 transition hover:bg-green-600"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data.map((item, key) => (
          <Review key={key} item={item} refetch={refetch} />
        ))
      )}
    </div>
  );
};

export default Reviews;
