import mongoose from "mongoose";

//  export const search = async (str) => {
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

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, { dbName: "Baddel_Dev" });
  } catch (error) {
  }
};
export default connectMongoDB;
