// import connectMongoDB from "../../lib/mongodb";
// import Product from "@/src/models/Product";
// import NewProduct from "@/src/models/NewProduct";
// import { NextResponse } from "next/server";
// import translator from "@/src/helpers/translate";
// import Company from "@/src/models/Companies";
// import NewCompany from "@/src/models/NewCompanies";

// export async function GET() {
//   await connectMongoDB();
//   console.log("translate route");
//   try {
//     console.log("translate route in try");
//     const result = await Product.aggregate([
//       {
//         // ! For Only products
//         $addFields: {
//           name: { en: "$name.en", ar: "$name.en" },
//           title: { en: "$title.en", ar: "$title.en" },
//           description: { en: "$description.en", ar: "$description.en" },
//           // owner: { en: "$owner.en", ar: "$owner.en" },
//           category: {
//             name: {
//               en: "$category.name.en",
//               ar: "$category.name.en",
//             },
//             subcategory_name: {
//               en: "$category.subcategory_name.en",
//               ar: "$category.subcategory_name.en",
//             },
//           },
//         },
//         // ! For Only companies
//         //     $addFields: {
//         //       name: { en: "$name", ar: "$name" },
//         //       about: { en: "$about", ar: "$about" },
//         //     },
//       },
//     ]);
//     console.log(result[0]);
//     const translatedProducts = await translator(result);
//     // NewCompany.insertMany(translatedProducts);
//     NewProduct.insertMany(translatedProducts);
//     return NextResponse.json({ message: translatedProducts });
//   } catch (error) {
//     return NextResponse.json({ message: "Error" });
//   }
// }
