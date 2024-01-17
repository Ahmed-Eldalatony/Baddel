import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/app/lib/mongodb";
import Product from "@/src/models/Product";
import Company from "@/src/models/Companies";
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  // const page = req.nextUrl.searchParams.get("page") || 1;
  // const limit = 10;
  // const skip = (+page - 1) * limit;
  await connectMongoDB();
  const products = await Product.find({
    $or: [
      { "name.en": { $regex: new RegExp(`${query}`, "i") } },
      { "name.ar": { $regex: new RegExp(`${query}`, "i") } },
    ],
  });

  console.log(query);
  const companies = await Company.find({
    $or: [
      { "name.en": { $regex: new RegExp(`${query}`, "i") } },
      { "name.ar": { $regex: new RegExp(`${query}`, "i") } },
    ],
  });
  // const count = products.length + companies.length;

  // .skip(0 * productsPerPage)
  // .limit(page * productsPerPage);
  // .limit(page * limit);
  // console.log("form here hap", companies);
  return NextResponse.json({ products, companies });
}
