import { useContext, useState } from "react";
import Input from "../components/input";
import Toggler from "../components/toggler";
import Button from "../components/button";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);

  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // bütün inputlardaki verileri nesne haline getir
    const newUser = Object.fromEntries(formData.entries());

    // satıcı hesabı ise nesne içerisine bunu kaydet
    newUser.isSeller = isSeller;

    console.log(newUser);

    // context'den gelen kaydolma methodu
    register(newUser);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Yeni Hesap Oluştur
          </h1>
          <Input label="İsim" isReq={true} name="username" />
          <Input label="Email" isReq={true} name="email" />
          <Input label="Fotoğraf" isReq={true} name="photo" type="file" />
          <Input label="Ülke" isReq={true} name="country" />
          <Input
            label="Şifre"
            isReq={true}
            name="password"
            type="password"
          />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Satıcı Olmak İstiyorum
          </h1>

          <Toggler setIsSeller={setIsSeller} />

          <Input
            label="Telefon"
            type="number"
            name="phone"
            disabled={!isSeller}
            isReq={isSeller}
          />
          <Input
            label="Açıklama"
            name="desc"
            disabled={!isSeller}
            isReq={isSeller}
          />

          <Button text="Kaydol" />

          <p className="mt-5 text-gray-500">
            Hesabınız var mı?
            <Link className="ms-3 text-blue-500" to="/login">
              Giriş Yap
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
