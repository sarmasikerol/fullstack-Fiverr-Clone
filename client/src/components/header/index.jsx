import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import User from "./user";
import Links from "./links";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Header = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value;

    navigate(`/search?query=${text}`);
  };

  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/fiverr.png" alt="fiverr" className="w-[100px]" />
        </Link>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex border rounded overflow-hidden max-w-[600px]"
        >
          <input
            className="w-full h-full px-3 outline-none"
            type="text"
            placeholder="Hizmetleri Ara..."
          />
          <button className="bg-black p-2 text-white text-xl max-md:hidden">
            <IoSearch />
          </button>
        </form>

        <div className="flex items-center gap-2 relative group">
          {user ? <User data={user} /> : <Links />}
        </div>
      </div>
    </header>
  );
};

export default Header;
