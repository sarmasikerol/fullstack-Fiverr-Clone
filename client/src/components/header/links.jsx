import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <Link className="transition hover:text-green-500" to="/login">
        Giriş Yap
      </Link>
      <Link
        className="transition border border-green-500 p-1 hover:bg-green-500 rounded hover:text-white"
        to="/register"
      >
        Kaydol
      </Link>
    </>
  );
};

export default Links;
