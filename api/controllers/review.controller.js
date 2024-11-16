import Gig from "../models/gig.model.js";
import Review from "../models/review.model.js";
import error from "../utils/error.js";

export const createReview = async (req, res, next) => {
  // 1) kullanıcı satıcı ise işlemi iptal et
  if (req.isSeller) return next(error(403, "Satıcılar yorum gönderemez"));

  try {
    // 2) kullanıcın bu hizmete daha önce attığımı yorumları al
    const oldReview = await Review.findOne({
      user: req.userId,
      gigId: req.body.gigId,
    });

    // 3) eski bir yorum varsa işlemi iptal et
    if (oldReview) return next(error(403, "Zaten bu hizmete yorumunuz var"));

    // 4) yorum belgesi oluştur
    const newReview = new Review({
      user: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    // 5) yorumu kaydet
    newReview.save();

    // 6) hizmet (gig) belgesini güncelle
    // toplam yorum sayısını 1 arttır
    // toplam yıldız sayısını atılan yorumun yıldızı kadar arttır
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: {
        starCount: req.body.star,
        reviewCount: 1,
      },
    });

    // client'a cevap gönder
    res.status(201).json({
      message: "Yorum Gönderildi",
      data: newReview,
    });
  } catch (err) {
    console.log(err);
    return next(error(500, err));
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate({
      path: "user",
      select: "username country photo ",
    });

    res.status(200).json({ message: "Yorumlar alındı", reviews });
  } catch (err) {
    next(error(500, err.message));
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    // 1) yorum bilgilerini al
    const review = await Review.findById(req.params.id);
    // 2) yorum farklı kullanıcıya ait ise işlemi durdur
    if (req.userId != review.user)
      return next(error("403", "Sadece kendi yorumlarınızı kaldırabilirsiniz"));
    // 3) yorumu sil
    await Review.deleteOne({ _id: req.params.id });
    // 4) hizmet belgesini güncelle
    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: {
        starCount: -review.star,
        reviewCount: -1,
      },
    });

    res.status(200).json({ message: "Yorum silindi" });
    // 5) hizmet belgesini güncelle
  } catch (err) {
    next(error(500, err.message));
  }
};
