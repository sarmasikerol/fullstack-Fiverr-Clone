import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import api from "../utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
const Login = () => {
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    login(user);
  };
  return (
    <div className="pt-24 max-w-[700px] mx-auto sm:min-w-[400px] max-sm:w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-10 text-gray-500">
        Hesabınıza Giriş Yapın
      </h1>

      <form onSubmit={handleSubmit}>
        <Input label="İsim" name="username" isReq={true} />
        <Input label="Şifre" name="password" isReq={true} />

        <Button text="Giriş Yap" />
      </form>
      <p className="mt-5 text-gray-500">
        Hesabınız yokmu
        <Link className="ms-3 text-blue-500 " to="/register">
          Kaydol
        </Link>
      </p>
    </div>
  );
};

export default Login;
