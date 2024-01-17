import mongoose, { Schema } from "mongoose";
// Implement a ts interface on that
const ratingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: String,
  date: Date,
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);
export default Rating;
