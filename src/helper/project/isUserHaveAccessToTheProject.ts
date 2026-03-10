import { Project } from "@/models/project.model";
import customError from "@/utils/customError";

export async function isUserHaveAccessToTheProject(
  projectId: string,
  userId: string,
) {
  try {
    const project = await Project.findOne({
      _id: projectId,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!project) {
      throw new customError("Project not found or access denied", 403);
    }

    return project;
  } catch (error) {
    throw error;
  }
}


// ## canUserDeleteProject