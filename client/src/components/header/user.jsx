import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const User = ({ data }) => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <img
        src={data.photo}
        className="w-[40px] h-[40px] rounded-full object-cover"
      />
      <span>{data.username}</span>

      <div
        className="w-[150px] text-[13px]  flex-col
        absolute top-[40px] left-0 transition duration-500 bg-gray-200 rounded-md hidden group-hover:flex text-center
      "
      >
        {data.isSeller && (
          <>
            <Link className="px-5 py-2 hover:bg-gray-100" to="/my-gigs">
              Hizmetler
            </Link>
            <Link
              className="px-5 py-2 hover:bg-gray-100 text-nowrap"
              to="/add-gig"
            >
              Hizmet Ekle
            </Link>
          </>
        )}
        <Link className="px-5 py-2 hover:bg-gray-100">Siparişler</Link>
        <Link className="px-5 py-2 hover:bg-gray-100">Mesajlar</Link>
        <button onClick={logout} className="px-5 py-2 hover:bg-gray-100">
          Çıkış Yap
        </button>
      </div>
    </>
  );
};

export default User;
