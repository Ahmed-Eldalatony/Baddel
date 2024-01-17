import connectMongoDB from "@/src/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/src/models/User";
import { sendEmail } from "@/src/helpers/mailer";



    connectMongoDB();
    export async function GET(request: NextRequest) {
      return NextResponse.json(
        {
          message: "Hello, world!",
        },
        { status: 200 }
      );
    }

    export async function POST(request: NextRequest) {
      console.log("fuck");
      try {
        const reqBody = await request.json();

        connectMongoDB();
        const { username, email, password } = reqBody;

        //check if user already exists
        const user = await User.findOne({ email });

        if (user) {
          return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
          );
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();

        //send verification email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
          message: "User created successfully",
          success: true,
          savedUser,
        });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }