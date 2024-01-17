import { NextResponse, NextRequest } from "next/server";
import Product from "@/src/models/Product";
export async function GET(req) {
  const productId = req.nextUrl.searchParams.get("productId") || "";

  try {

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ data: "Error fetching product" });
    }
    return NextResponse.json({ data: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "Error fetching product" });
  }
}
