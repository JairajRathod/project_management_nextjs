import { User } from "@/models/user.model";
import customError from "@/utils/customError";

// create a user and return the details
export async function createUserService(userDetails: object) {
  try {
    // creating user and returning the result
    const isUserCreated = await User.create({ ...userDetails });

    // if not created then throw error
    if (!isUserCreated) {
      throw new customError("User not created due to some reason", 400);
    }

    // return the result
    return isUserCreated;
  } catch (error) {
    throw error;
  }
}

// find the user details and send the response
export async function findUserByIdService(userId: string) {
  try {
    // checking user exist or not
    const isUserExist = await User.findById(userId);

    // throwing error if user not found
    if (!isUserExist) {
      throw new customError("User not Found", 404);
    }

    // return user details if user found
    return isUserExist;
  } catch (error) {
    throw error;
  }
}

// find the user, update it and send response
export async function updateUserByIdService(
  userId: string,
  updateDetails: object,
) {
  try {
    // updating user details
    const isUserUpdate = await User.findByIdAndUpdate(
      { userId },
      { $set: { ...updateDetails } },
      { runValidators: true },
    );

    // throwing error if use details not updated
    if (!isUserUpdate) {
      throw new customError("User not updated", 400);
    }

    // return result if user updated
    return isUserUpdate;
  } catch (error) {
    throw error;
  }
}

// find the user, update it and send response
export async function updateUserByEmailService(
  email: string,
  updateDetails: object,
) {
  try {
    // updating user details
    const isUserUpdate = await User.findOneAndUpdate(
      { email },
      { $set: { ...updateDetails } },
      { runValidators: true },
    );

    // throwing error if use details not updated
    if (!isUserUpdate) {
      throw new customError("User not updated", 400);
    }

    // return result if user updated
    return isUserUpdate;
  } catch (error) {
    throw error;
  }
}

// find the user, delete it and send response
export async function deleteUserByIdService(userId: string) {
  try {
    // trying to delete the user
    const isUserDeleted = await User.findByIdAndDelete(userId);

    // throwing error if user not delete
    if (!isUserDeleted) {
      throw new customError("User not deleted", 400);
    }

    // return deleted user details
    return isUserDeleted;
  } catch (error) {
    throw error;
  }
}
