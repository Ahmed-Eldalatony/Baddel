import { getDataFromToken } from "@/src/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/User";
import connectMongoDB from "@/src/app/lib/mongodb";

connectMongoDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesage: "User found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
