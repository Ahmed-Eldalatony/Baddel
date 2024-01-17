import mongoose, { Schema } from "mongoose";
const newCompanySchema = new Schema({
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

const NewCompany =
  mongoose.models.NewCompany || mongoose.model("NewCompany", newCompanySchema);
export default NewCompany;
