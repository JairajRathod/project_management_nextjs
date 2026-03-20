import connectDB from "@/libs/connectDB";
import { User } from "@/models/user.model";
import { findUserByIdService } from "@/services/user.service";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import { NextRequest } from "next/server";

// get user details by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // connecting the database
    await connectDB();

    // getting id from params
    const { id: userId } = await params;

    // finding the user
    const isUserExist = await findUserByIdService(userId);

    // return user details
    return ApiResponse({
      statusCode: 200,
      message: "User found successfully",
      data: isUserExist,
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      message: err?.message || "Something went wrong",
      error,
    });
  }
}

// delete user by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // connect database
    await connectDB();

    // getting id from the params
    const { id: userId } = await params;

    // deleting the user with the provided id
    const isUserDeleted = await User.findByIdAndDelete(userId);

    // checking user deleted or not if no then throw error
    if (!isUserDeleted) {
      return ApiError({
        statusCode: 400,
        message: "User not found in the database",
      });
    }

    // after successfully delete throw error
    return ApiResponse({
      statusCode: 200,
      message: "User deleted successfully",
      data: isUserDeleted,
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      message: err?.message || "Something went wrong",
      error,
    });
  }
}

// update user by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // connect database
    await connectDB();

    // user id from params
    const { id: userId } = await params;

    console.log(params);

    // request body
    const { name, role, image } = await req.json();

    // validation
    if (!userId) {
      return ApiError({
        statusCode: 400,
        message: "User id is required",
      });
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname: name,
        role,
        avatar: image,
      },
      {
        new: true, // return updated document
        runValidators: true, // validate schema
      },
    );

    // if user not found
    if (!updatedUser) {
      return ApiError({
        statusCode: 404,
        message: "User not found",
      });
    }

    // success response
    return ApiResponse({
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };

    return ApiError({
      statusCode: err?.statusCode || 500,
      message: err?.message || "Something went wrong",
      error,
    });
  }
}
