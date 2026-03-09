import { Project } from "@/models/project.model";
import customError from "@/utils/customError";

// find project and return details and if not found then throw error
export async function findProjectService(projectId: string) {
  try {
    const isProjectExist = await Project.findById(projectId);

    if (!isProjectExist) {
      throw new customError("Project not found with provided id", 404);
    }

    return isProjectExist;
  } catch (error) {
    throw error;
  }
}

// delete project and return details and if not deleted then throw error
export async function findAndDeleteProjectService(projectId: string) {
  try {
    // deleting project
    const isProjectDeleted = await Project.findByIdAndDelete(projectId);

    // if project not deleted then throw error
    if (!isProjectDeleted) {
      throw new customError("Error during removing project", 400);
    }

    return isProjectDeleted;
  } catch (error) {
    throw error;
  }
}

// update project and return result if not updated then throw error
export async function findAndUpdateProjectService() {
  try {
  } catch (error) {
    throw error;
  }
}
