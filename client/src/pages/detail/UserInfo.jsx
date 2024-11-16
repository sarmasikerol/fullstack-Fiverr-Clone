import React from "react";
import { FaStar } from "react-icons/fa";
import { TbNorthStar } from "react-icons/tb";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h1 className="font-bold text-lg mt-10 mb-3">
        {user.username}'i Tanıyalım
      </h1>

      <div className="flex flex-col items-center gap-5">
        <img
          className="size-28 rounded-full object-cover"
          src={user.photo}
        />

        <h4 className="font-semibold">{user.username}</h4>

        <p className="text-gray-600">{user.desc}</p>

        <div className="flex gap-5">
          <div className="flex items-center gap-1">
            <FaStar />
            <span className="font-semibold">4.9</span>
            <span className="text-gray-500">(2896)</span>
          </div>

          <div className="flex items-center gap-1 bg-orange-300 p-1 rounded text-sm">
            <span>Top Rated</span>
            <TbNorthStar />
            <TbNorthStar />
            <TbNorthStar />
          </div>
        </div>

        <button className="w-full p-2 border border-black rounded text-sm hover:bg-zinc-700 hover:text-white transition">
          İletişime Geç
        </button>
      </div>

      <div className="border my-10 p-5 grid md:grid-cols-2 gap-5">
        <Field label="Nereden" value={user.country} />
        <Field label="Üyelik Tarihi" value={user.createdAt} />
        <Field label="Telefon" value={user.phone} />
        <Field label="Email" value={user.email} />
      </div>
    </div>
  );
};

export default UserInfo;

const Field = ({ label, value }) => {
  return (
    <p className="flex flex-col gap-1">
      <span className="text-gray-500">{label}</span>
      <span className="text-zinc-700 font-semibold">{value}</span>
    </p>
  );
};
