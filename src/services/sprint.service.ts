import { Sprint } from "@/models/sprint.model";
import customError from "@/utils/customError";

export async function createSprintService(sprintDetails: object) {
  try {
    // creating sprint and return result
    const isSprintCreated = await Sprint.create({ ...sprintDetails });

    // throwing error if not created
    if (!isSprintCreated) {
      throw new customError("Error during create sprint", 400);
    }

    // return the result
    return isSprintCreated;
  } catch (error) {
    throw error;
  }
}

export async function findSprintByIdService(sprintId: string) {
  try {
    // getting user details
    const isSprintExist = await Sprint.findById(sprintId);

    // throwing error if not get details
    if (!isSprintExist) {
      throw new customError("Sprint not found", 404);
    }

    // return the result
    return isSprintExist;
  } catch (error) {
    throw error;
  }
}
export async function deleteSprintByIdService(sprintId: string) {
  try {
    // trying to delete the user details
    const isSprintDeleted = await Sprint.findByIdAndDelete(sprintId);

    // throwing error if user not deleted
    if (!isSprintDeleted) {
      throw new customError("Sprint not deleted due to some reason", 400);
    }

    // return the result
    return isSprintDeleted;
  } catch (error) {
    throw error;
  }
}

export async function updateSprintByIdService(
  sprintId: string,
  updateDetails: object,
) {
  try {
    // trying to update the sprint details
    const isSprintUpdated = await Sprint.findByIdAndUpdate(
      sprintId,
      { $set: { ...updateDetails } },
      { runValidators: true },
    );

    // throwing error if not updated
    if (!isSprintUpdated) {
      throw new customError("Sprint not updated due to some reason", 400);
    }

    // return the result
    return isSprintUpdated;
  } catch (error) {
    throw error;
  }
}
