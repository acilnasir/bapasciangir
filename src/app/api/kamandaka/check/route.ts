import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (code === process.env.KAMANDAKA_ACCESS_CODE) {
      return NextResponse.json({
        success: true,
        redirectUrl:
          "https://sites.google.com/view/kamandaka-digital-assistant",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Kode akses salah",
      },
      {
        status: 401,
      },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan",
      },
      {
        status: 500,
      },
    );
  }
}
