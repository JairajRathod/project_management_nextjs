import { Project } from "@/models/project.model";
import CustomError from "@/utils/customError";

interface ProjectInput {
  name?: string;
  description?: string;
  owner?: string;
  members?: string[];
}

// Create Project
export async function createProjectService(projectDetails: ProjectInput) {
  const project = await Project.create(projectDetails);

  if (!project) {
    throw new CustomError("Project could not be created", 400);
  }

  return project;
}

// Find Project By ID
export async function findProjectByIdService(projectId: string) {
  const project = await Project.findById(projectId).lean();

  if (!project) {
    throw new CustomError("Project not found with provided id", 404);
  }

  return project;
}

// Delete Project
export async function deleteProjectByIdService(projectId: string) {
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new CustomError("Project not found or already deleted", 404);
  }

  return project;
}

// Update Project
export async function updateProjectByIdService(
  projectId: string,
  projectDetails: Partial<ProjectInput>,
) {
  const project = await Project.findByIdAndUpdate(
    projectId,
    { $set: projectDetails },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!project) {
    throw new CustomError("Project not found or update failed", 404);
  }

  return project;
}
