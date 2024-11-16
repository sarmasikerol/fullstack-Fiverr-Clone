import error from "../utils/error.js";
import Gig from "../models/gig.model.js";
import cloudinary from "../utils/cloudinary.js";

// filtreleme ayarlarını oluşturan method
const buildFilters = (query) => {
  // filtreleme
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.min || query.max) {
    filters.price = {};

    if (query.min) {
      filters.price.$gte = query.min;
    }

    if (query.max) {
      filters.price.$lte = query.max;
    }
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  // fonsiyonun çağırıldığı yere nesneyi döndür
  return filters;
};

export const getAllGigs = async (req, res, next) => {
  const filters = buildFilters(req.query);
  try {
    const gigs = await Gig.find(filters).populate({
      path: "user",
      select: "username photo",
    });

    if (gigs.length === 0) {
      return next(error(404, "Aranılan kriterlere uygun hizmet bulunamadı"));
    }

    res.status(200).json({ message: "Hizmetler bulundu", gigs });
  } catch (err) {
    next(err(400, err.message));
  }
};

export const createGig = async (req, res, next) => {
  //1) isteği atan kullanıcının hesabı seller değilse hata gönder
  if (!req.isSeller)
    return next(error(423, "Sadece 'seller' hesaplar hizmet oluşturabilir"));

  let cover;
  // kapak fotosunu yükle
  await cloudinary.uploader.upload(req.files.cover[0].path, (err, result) => {
    if (err) return next(error(500, "Bir sorun oluştu"));

    cover = result.secure_url;
  });

  // Backende gelen bütün fotoğrafları buluta yüklemek için istekleri hazırla
  let imagesToUpload = req.files.images.map((file) =>
    cloudinary.uploader.upload(file.path, (err, result) => {
      if (err) return next(error(500, "Bir sorun oluştu"));

      return result;
    })
  );

  // bütün yükleme isteklerini tetikle
  const uploads = await Promise.all(imagesToUpload);

  // yüklenen dosyaların sadece url'lerin oluşan dizi
  const images = uploads.map((i) => i.secure_url);

  try {
    // resimleri body'e ekle
    req.body.images = images;
    req.body.cover = cover;

    // hizmetleri diziye çevir
    req.body.features = req.body.features.split(",");

    //2) yeni hizmet oluştur / kaydet
    const savedGig = await Gig.create({ ...req.body, user: req.userId });

    //3) client'a cevap gönder
    res
      .status(201)
      .json({ message: "Hizmet başarıyla oluşturuldu", gig: savedGig });
  } catch (err) {
    next(error(400, err.message));
  }
};

export const getGig = async (req, res, next) => {
  try {
    // url'e param olarak eklenen id'den yola çıkarak hizmeti al
    const gig = await Gig.findById(req.params.id).populate("user");

    res.status(200).json({ message: "Hizmet bulundu", gig });
  } catch (err) {
    next(err(500, "Aranılan hizmet bulunamadı"));
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    //1) hizmet detaylarını al
    const gig = await Gig.findById(req.params.id);

    //2) hizmeti oluşturan ve silmek isteyen kişiler aynı değilse hata gönder
    if (gig.user != req.userId) {
      return next(
        error(403, "Sadece kendi oluşturduğunuz hizmetleri silebilirsiniz")
      );
    }

    //3) hizmeti sil
    await Gig.findByIdAndDelete(req.params.id);

    //4) client'a cevap gönder
    res.status(200).json({ message: "Hizmet silindi" });
  } catch (error) {
    next(err(500, "Hizmet başarıyla silinemedi"));
  }
};
