import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/app/lib/mongodb";
import Product from "@/src/models/Product";
export async function GET(req: NextRequest, { params }) {
  const page = req.nextUrl.searchParams.get("page");
  const limit = 10;
  await connectMongoDB();
  const products = await Product.find({
    $or: [
      {
        "category.name.en": { $regex: new RegExp(`${params.category}`, "i") },
      },
      {
        "category.subcategory_name.en": {
          $regex: new RegExp(`${params.category}`, "i"),
        },
      },
    ],
  })
    .skip((page - 1) * limit)
    .limit(limit);
  console.log(products);
  const count = await Product.countDocuments({
    $or: [
      {
        "category.name.en": { $regex: new RegExp(`${params.category}`, "i") },
      },
      {
        "category.subcategory_name.en": {
          $regex: new RegExp(`${params.category}`, "i"),
        },
      },
    ],
  });
  // const pagesCount = count / limit;
  // pagesCount < page
  // ? NextResponse.json({ message: "No more products" })
  return NextResponse.json({ products, page, count });
}
