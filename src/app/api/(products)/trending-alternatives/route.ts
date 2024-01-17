import connectMongoDB from "@/src/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Product from "@/src/models/Product";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || 1;
  const limit = 4;
  await connectMongoDB();
  const products = await Product.find({
    alternatives: { $size: 1 },
  })
    .skip((+page - 1) * limit)
    .limit(limit);
// why just logging in client side  console.log("products here", products[0], products.length);
  return NextResponse.json({ products });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  // How to edit the message to show the product title is deleted
  return NextResponse.json({ message: "Product Deleted" }, { status: 201 });
}
// export async function POST(req) {
//   const data = await req.json();
//   const name = await data.name;
//   const title = await data.title;
//   const thumbnail = await data.thumbnail;
//   const description = await data.description;
//   const owner = await data.owner;
//   const category = await data.category;
//   const alternatives = await data.alternatives;
//   const availability = await data.availability;
//   const types = await data.types;
//   await connectMongoDB();
//   await Product.create({
//     name,
//     title,
//     thumbnail,
//     description,
//     owner,
//     category,
//     alternatives,
//     availability,
//     types,
//   });
//   return NextResponse.json(
//     {
//       message: name,
//       title,
//       thumbnail,
//       description,
//       owner,
//       category,
//       alternatives,
//       availability,
//       types,
//     },
//     { status: 201 }
//   );
// }
