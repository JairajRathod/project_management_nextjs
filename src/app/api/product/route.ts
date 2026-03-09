import ApiError from "@/utils/ApiError";

// getting all projects details
export async function GET() {
  try {
    // checking wether user is admin or not
    // if not admin then throw error
    // if admin then get all the project with the particular organization
    // if projects not fetched then throw error
    // if projects fetched then return response
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    return ApiError({
      statusCode: err?.statusCode || 500,
      error,
      message: err?.message || "Something went wrong",
    });
  }
}

//
export async function POST() {}
