import { isItAdmin } from "@/libs/userRole";
import { createProjectService, findProjectByIdService } from "@/services/project.service";
import { findUserByIdService } from "@/services/user.service";
import ApiError from "@/utils/ApiError";
import customError from "@/utils/customError";
import { NextRequest } from "next/server";

// getting all projects details
export async function GET({ params }: { params: { id: string } }) {
  try {
    // checking user is admin or not
    // if not then throw error
    // if yes then getting all project details
    // return details
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      error,
      message: err?.message || "Something went wrong",
    });
  }
}

// create project with the required project details
export async function POST(req: NextRequest) {
  try {

    const {} = req.json();

    // user is Admin or Manager
    const isUserExist = await findUserByIdService("user_id_here");

    // if user is Member then throw error
    if (isUserExist.role === "MEMBER") {
      throw new customError("You are allow to do this action", 400);
    }

    // if user is Admin or Manager then create project
    const isprojectCreated = await createProjectService()

    // if project not created then throw error
    // return the result
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      error,
      message: err?.message || "Something went wrong",
    });
  }
}
