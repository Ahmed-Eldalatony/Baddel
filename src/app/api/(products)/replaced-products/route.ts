import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/app/lib/mongodb";
import Product from "@/src/models/Product";
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("p") || 1;
  const limit = 4;
  const skip = (+page - 1) * limit;
  await connectMongoDB();
  const products = await Product.find({
    alternatives: { $size: 0 },
  }).limit(limit * page);
  return NextResponse.json({ products });
}
