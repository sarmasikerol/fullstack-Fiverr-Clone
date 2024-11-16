import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  // Giriş yap
  const login = (user_data) => {
    api
      .post("/auth/login", user_data)
      .then((res) => {
        // bildirim gönder
        toast.success(res.data.message);

        // kullanıcı verisini state'e aktar
        setUser(res.data.user);

        // kullanıcı bilgilerini locale kaydet
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // jwt tokenini locale kaydet
        localStorage.setItem("token", res.data.token);

        // anasayfaya yönlendir
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

   // Kaydol
   const register = (newUser) => {
    // kullanıcı hesabı oluşturmak için api isteğ at
    api
      .post("/auth/register", newUser, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(
          "Hesabınız başarıyla oluşturuldu. Giriş Yapabilirsiniz..."
        );

        navigate("/login");
      })
      .catch((err) => toast.error(err.message));
  };

  // Çıkış Yap
  const logout = () => {
    api.post("/auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);

      navigate("/");
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
