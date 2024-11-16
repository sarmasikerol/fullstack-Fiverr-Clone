import { useNavigate } from "react-router-dom";
import { categories } from "../../utils/constants";

const Category_list = () => {
  const navigate = useNavigate();

  const handleClick = (i) => {
    navigate(`/search?category=${i.name}`);
  };
  return (
    <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-5">
      {categories.map((i, key) => (
        <div
          onClick={() => handleClick(i)}
          key={key}
          className="border shadow p-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-green-100"
        >
          <div className="flex flex-col gap-3">
            <span className="text-3xl">{i.icon}</span>
            <span className="font-semibold text-sm">{i.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category_list;
