import mongoose, { Schema } from "mongoose";
// Implement a ts interface on that
const productSchema = new Schema({
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

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;



// {
//   "_id": {
//     "$oid": "656b1408994e88ba6fc0f282"
//   },
//   "name": "Tiger",
//   "thumbnail": "https://w7.pngwing.com/pngs/861/377/png-transparent-logo-tiger-leopard-brand-corporation-tiger-food-animals-text.png",
//   "description": "- Tiger chips is an Egyptian chip brand owned by Egypt Foods, a premier snack manufacturing company .\n- Tiger chips are available in seven different flavors, offering a variety of options for consumers to enjoy. The brand has gained recognition in the Egyptian market and is known for its positive attributes.\n\n- Tiger chips have been well-received by consumers, who appreciate the quality and taste of the product. The brand has managed to create a positive image and generate loyalty among its customers. The availability of different flavors allows individuals to find their preferred taste and enjoy a satisfying snacking experience.\n\n- Egyptian children, in particular, have been exposed to advertising for Tiger chips, which has contributed to positive emotions and brand loyalty from a young age .\n- This indicates that the brand has successfully connected with its target audience and created a positive association with its products.\n\n- Overall, Tiger chips is an Egyptian chip brand that has made a positive impact in the market. With its range of flavors and quality offerings, it has gained recognition and loyalty among consumers in Egypt.\n",
//   "owner": "Egypt Foods",
//   "more_types": [],
//   "types": [
//     "valid"
//   ],
//   "voting": {
//     "$numberLong": "0"
//   },
//   "alternatives": [
//     {
//       "name": "Chipsy",
//       "id": "6567f5563fd387ac072321cc",
//       "thumbnail": " https://scontent.fcai20-3.fna.fbcdn.net/v/t39.30808-6/352215188_554409006905592_3599779740694017614_n.png?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=oeDXa1sTeloAX8cZzbQ&_nc_ht=scontent.fcai20-3.fna&cb_e2o_trans=q&oh=00_AfBVb9cuLCjoRsXBNBy6Y9muUjy3C9EowiY8OiLpki8Zaw&oe=656CAAFC"
//     }
//   ],
//   "additional_content": {},
//   "availability": [],
//   "title": "Popular egyptian potato chips ",
//   "category": {
//     "name": "Food-Products",
//     "subcategory_name": "Chips"
//   },
//   "company": {
//     "$oid": "656a6f9035ffc2d6c903a954"
//   }
// }