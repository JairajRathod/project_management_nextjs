import customError from "@/utils/customError";

export async function isItAdmin(role: string) {
  try {
    if (role !== "ADMIN") {
      throw new customError("This is only for ADMIN", 400);
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export async function isItManager(role: string) {
  try {
    if (role !== "MANAGER") {
      throw new customError("This is only for ADMIN", 400);
    }

    return true;
  } catch (error) {
    throw error;
  }
}

// export async function isItAdminOrManager(role: string) {
//   try {
//     if (role !== "MANAGER" || role !== "ADMIN") {
//       throw new customError("This is only for ADMIN or MANAGER", 400);
//     }

//     return true;
//   } catch (error) {
//     throw error;
//   }
// }

export async function isItMember(role: string) {
  try {
    if (role !== "MEMBER") {
      throw new customError("Your are not a member", 400);
    }

    return true;
  } catch (error) {
    throw error;
  }
}
