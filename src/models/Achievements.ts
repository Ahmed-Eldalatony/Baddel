import mongoose from "mongoose";
const achievementSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
