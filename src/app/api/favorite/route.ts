import connectMongoDB from "@/src/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/User";
export async function GET(req) {
  const productId = req.nextUrl.searchParams.get("productId") || "";
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const isGuest = userId === "guest";
  var favoriteExist = false;
  if (isGuest) {
    return NextResponse.json({ favoriteExist, isGuest });
  } else if (userId && isGuest === false) {
    const user = await User.findById(userId);
    const userFavorites = user?.favorites;
    favoriteExist = userFavorites.includes(productId);
    console.log("Favoreite exist", favoriteExist);
    return NextResponse.json({ favoriteExist, isGuest });
  } else {
    favoriteExist = false;
    return NextResponse.json({ favoriteExist, isGuest });
  }
}

export async function PUT(req) {
  const data = await req.json();
  const userId = await data.userId;
  const productId = await data.productId;
  await connectMongoDB();

  const user = await User.findById(userId);
  const favoriteExist = user?.favorites.includes(productId);
  if (favoriteExist) {
    return NextResponse.json({
      message: "Favorite exist",
    });
  } else {
    user?.favorites.push(productId);
    user.save();
    return NextResponse.json(
      {
        message: "Created",
      },
      { status: 201 }
    );
  }
}

export async function DELETE(req) {
  const productId = req.nextUrl.searchParams.get("productId") || "";
  const userId = req.nextUrl.searchParams.get("userId") || "";
  console.log("deleting");
  await removeFavorite(userId, productId);
  return NextResponse.json({
    message: "Favorite removed",
  });
}

async function removeFavorite(userId, productId) {
  const user = await User.findById(userId);

  const index = user.favorites.indexOf(productId);
  if (index > -1) {
    user.favorites.splice(index, 1);
  }

  await user.save();
}
