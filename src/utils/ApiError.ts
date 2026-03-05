import { NextResponse } from "next/server";

interface ApiErrorInterface<T> {
  message: string;
  statusCode: number;
  error?: T;
}

async function ApiError<T>({
  message,
  statusCode,
  error,
}: ApiErrorInterface<T>) {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status: statusCode },
  );
}

export default ApiError;
