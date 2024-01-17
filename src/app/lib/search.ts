// import connectMongoDB from "./mongodb";
// import Product from "@/src/models/Product";
//  export const search = async (str) => {
//   "use server";
//   connectMongoDB();
//   console.log("===================================================");
//   try {
//     const data = await Product.find({
//       $or: [{ name: { $regex: str, $options: "i" } }],
//     });
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
