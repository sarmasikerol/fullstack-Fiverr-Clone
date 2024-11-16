import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Client tarafından çerezler / header ile gönderilen jwt tokeninin geçerliliğini kontrol edicez ve
// eğer geçersizse hata gönderecek, geçerliyse kullanıcı bilgilerini req nesnesi içerisine kaydedicek

const protect = (req, res, next) => {
  //1) Çerezler / headers ile gelen token'e eriş
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.token;

  //2) Token yoksa hata ver
  if (!token) return next(error(423, "Yetkiniz yok (Token bulunamadı)"));

  //3) Token geçerli mi kontrol et
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    //4) Token geçersizse hata gönder
    if (err) return next(error(423, "Tokeniniz geçersiz veya süresi dolmuş"));

    //5) Geçerliyse req nesnesine kullanıcı bilgilerini ekle
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    //6) Sonraki adıma devam et
    next();
  });
};

export default protect;
