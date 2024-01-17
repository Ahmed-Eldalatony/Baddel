import mongoose, { Schema } from "mongoose";
// Implement a ts interface on that
const companySchema = new Schema({
  name: {
    en: String,
    ar: String,
  },
  thumbnail: String,
  about: {
    en: String,
    ar: String,
  },
  link: String,
  type: String,
});

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);
export default Company;


