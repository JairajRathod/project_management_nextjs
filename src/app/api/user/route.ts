import connectDB from "@/libs/connectDB";
import { User } from "@/models/user.model";
import {
  createUserService,
  updateUserByEmailService,
} from "@/services/user.service";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import customError from "@/utils/customError";
import signupAndLoginValidator from "@/validators/auth.validator";
import { NextRequest } from "next/server";

// This is a post method which used to put data on database
export async function POST(req: NextRequest) {
  try {
    // connect the database
    await connectDB();

    const userDetails = await req.json();

    const isUserDataValidated = signupAndLoginValidator.safeParse(userDetails);

    if (!isUserDataValidated) {
      throw new customError("User Data is not validated successfully", 400);
    }

    // destructuring the required details
    const { email, name, image } = userDetails;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const updatingDetails = {
        email,
        name,
        avatar: image,
      };

      const isUserUpdated = await updateUserByEmailService(
        email,
        updatingDetails,
      );

      return ApiResponse({
        statusCode: 200,
        message: "User Login successfully",
        data: isUserUpdated,
      });
    }

    // creating the user in the database
    const isUserCreated = await await createUserService({
      fullname: name,
      email: email,
      role: "MEMBER",
      avatar: image,
      isVerified: true,
      isActive: true,
    });

    // sending response if user created
    return ApiResponse({
      statusCode: 200,
      message: "User Created",
      data: isUserCreated,
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      error,
      message: err?.message || "Something went wrong",
    });
  }
}

// This is a get method which used to get data from the database
export async function GET() {
  try {
    // connect db
    await connectDB();
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    ApiError({
      statusCode: err?.statusCode || 500,
      error,
      message: err?.message || "Something went wrong",
    });
  }
}
