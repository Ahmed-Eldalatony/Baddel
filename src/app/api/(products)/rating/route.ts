import connectMongoDB from "@/src/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Rating from "@/src/models/Ratings";

export async function GET(req) {
  const productId = req.nextUrl.searchParams.get("productId") || "";
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const productRatings = await Rating.find({
    productId,
  });
  var yourRating = false;
  var ratingExist = false;
  const isGuest = userId === "guest";

  if (isGuest) {
    return NextResponse.json({ productRatings, ratingExist, isGuest });
  } else if (userId && isGuest === false) {
    ratingExist = (await Rating.findOne({
      productId,
      userId,
    }))
      ? true
      : false;
    yourRating = await Rating.findOne({
      productId,
      userId,
    });
  } else {
    ratingExist = false;
  }

  return NextResponse.json({
    productRatings,
    ratingExist,
    isGuest,
    yourRating,
  });
}

export async function POST(req) {
  const data = await req.json();
  const productId = await data.productId;
  const userId = await data.userId;
  const username = await data.username;
  const rating = await data.rating;
  const comment = await data.comment;
  await connectMongoDB();
  const ratingExist = await Rating.findOne({
    productId,
    userId,
  });
  if (ratingExist) {
    console.log("Rating exist");
    return;
  }

  const review = await Rating.create({
    productId,
    username,
    userId,
    rating,
    comment,
  });
  return NextResponse.json(
    {
      message: review,
    },
    { status: 201 }
  );
}
// generate function to update rating with the same method used with get function
export async function PUT(req) {
  const data = await req.json();
  const productId = await data.productId;
  const userId = await data.userId;
  const username = await data.username;
  const rating = await data.rating;
  const comment = await data.comment;
  await connectMongoDB();
  const ratingExist = await Rating.findOne({
    productId,
    userId,
  });
  if (!ratingExist) {
    return;
  }
  console.log("updated", data);
  await Rating.updateOne(
    {
      productId,
      userId,
    },
    {
      $set: {
        rating,
        comment,
      },
    }
  );
  return NextResponse.json(
    {
      message: "Rating updated",
    },
    { status: 201 }
  );
}
