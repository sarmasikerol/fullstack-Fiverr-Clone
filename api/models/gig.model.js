import { Schema, model } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Lütfen kullanıcı id'sini tanımlayın"],
    },
    title: {
      type: String,
      required: [true, "Lütfen title'ı tanımlayın"],
    },
    desc: {
      type: String,
      required: [true, "Lütfen desc'i tanımlayın"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Lütfen category'i tanımlayın"],
    },
    cover: {
      type: String,
      required: [true, "Lütfen cover'i tanımlayın"],
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      required: [true, "Lütfen shortDesc'i tanımlayın"],
    },
    deliveryTime: {
      type: Number,
      required: [true, "Lütfen deliveryTime'i tanımlayın"],
    },
    revisionNumber: {
      type: Number,
      required: [true, "Lütfen revisionNumber'ı tanımlayın"],
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Lütfen price'ı tanımlayın"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ortalama ratingi veritabanında tutmaya gerek olmadığından zaten tutulan iki değerin hesaplanması sonucu ortaya çıktığı için get isteklerinde client'a göndermeden önce ortalamayı hesaplayıp eleyicez
gigSchema.virtual("avgRating").get(function () {
  return (this.starCount / this.reviewCount).toFixed(2);
});

export default model("Gig", gigSchema);
