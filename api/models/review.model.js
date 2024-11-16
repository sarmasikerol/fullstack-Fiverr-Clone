import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.ObjectId,
      ref: "User",
    },

    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },

    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema)

export default Review;