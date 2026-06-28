import { NextResponse } from "next/server";

class ApiResponse {
  // 200 OK
  static ok(message = "Success", data: unknown = {}): NextResponse {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: 200 }
    );
  }

  // 201 Created
  static created(
    message = "Resource created successfully",
    data: unknown = {}
  ): NextResponse {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: 201 }
    );
  }

  // 202 Accepted
  static accepted(
    message = "Request accepted",
    data: unknown = {}
  ): NextResponse {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: 202 }
    );
  }

  // 204 No Content (Note: 204 bodies are usually empty per spec)
  static noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
  }
}

export default ApiResponse;
