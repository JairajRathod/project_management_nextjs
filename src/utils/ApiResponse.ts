import { NextResponse } from "next/server";

interface ApiResponseInterface<T> {
  message: string;
  data?: T;
  statusCode: number;
}

function ApiResponse<T>({
  message,
  data,
  statusCode,
}: ApiResponseInterface<T>) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode },
  );
}

export default ApiResponse;
