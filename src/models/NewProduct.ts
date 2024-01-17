import mongoose, { Schema } from "mongoose";
const newProductSchema = new Schema({
  name: {
    en: String,
    ar: String,
  },
  title: {
    en: String,
    ar: String,
  },
  thumbnail: String,
  description: {
    en: String,
    ar: String,
  },
  owner: {
    en: String,
    ar: String,
  },
  category: {
    name: {
      en: String,
      ar: String,
    },
    subcategory_name: {
      en: String,
      ar: String,
    },
  },
  alternatives: Array<Object>,
  availability: Array<String>,
  types: Array,
  more_types: Array<String>,
  voting: Number,
  additional_content: Object,
  company: Object,
});

const NewProduct =
  mongoose.models.NewProduct || mongoose.model("NewProduct", newProductSchema);
export default NewProduct;
