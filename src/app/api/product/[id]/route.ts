import { Issue } from "@/models/issue.model";
import { Project } from "@/models/project.model";
import { Sprint } from "@/models/sprint.model";
import { User } from "@/models/user.model";
import {
  findAndDeleteProjectService,
  findProjectService,
} from "@/services/project.service";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import customError from "@/utils/customError";

// get project with id
export async function GET({ params }: { params: { id: string } }) {
  try {
    // getting id from the params
    const { id: projectId } = await params;

    // getting user details and check wether user is in this project or not
    const isUserExist = await User.findById();

    // throwing error if user not exist
    if (!isUserExist) {
      throw new customError("User with this id not found", 404);
    }

    // getting user details and check wether user is member of this project or not
    const isProjectExist = await findProjectService(projectId);

    // finding user id exist in the project member array or not
    const isUserInThisProject = isProjectExist?.members.find(
      (pId: string) => pId.toString() === projectId,
    );

    // throwing error if user is not in the project member array
    if (!isUserInThisProject) {
      throw new customError("User not present in this project", 400);
    }

    // if project fetched then return response
    return ApiResponse({
      statusCode: 200,
      message: "Project details fetched successfully",
      data: isProjectExist,
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

// update project with id
export async function PUT() {
  try {
    // getting user details and check wether user is member of this project or not
    // if not then throw error
    // if yes then update details related to the project
    // if project not updated then throw error
    // if project details updated then return response
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      error,
      message: err?.message || "Something went wrong",
    });
  }
}

// delete project with id
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    // getting id from the params
    const { id: projectId } = await params;

    // getting user details and check wether user is MANAGER of this project or not
    const isUserExist = await User.findById();

    // throwing error if user not exist
    if (!isUserExist) {
      throw new customError("User with this id not found", 404);
    }

    // throwing error if user is not ADMIN or MANAGER
    if (isUserExist.role === "MEMBER") {
      throw new customError("You don't have access to this action", 400);
    }

    // find project and getting all details or throwing error using find service
    const isProjectExist = await findProjectService(projectId);

    // finding user id exist in the project member array or not
    const isUserInThisProject = isProjectExist?.members.find(
      (pId: string) => pId.toString() === projectId,
    );

    // throwing error if user is not in the project member array
    if (!isUserInThisProject) {
      throw new customError("User not present in this project", 400);
    }

    // deleting all issue in the project
    const isIssuesDeleted = await Issue.find({ projectId });

    // throwing error if issue not deleted
    if (!isIssuesDeleted) {
      throw new customError("Error during removing issues", 400);
    }

    // deleting all sprint in the project
    const isSprintDeleted = await Sprint.find({ projectId });

    // throwing error if sprint not deleted
    if (!isSprintDeleted) {
      throw new customError("Error during removing sprint", 400);
    }

    // deleting project or throwing error using delete service
    const isProjectDeleted = await findAndDeleteProjectService(projectId);

    // if project deleted then return response
    return ApiResponse({
      statusCode: 200,
      message: "Project Deleted Successfully",
      data: isProjectDeleted,
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
