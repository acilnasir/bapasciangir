import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const publikasi = await prisma.publikasi.findUnique({
      where: { id },
    });

    if (!publikasi) {
      return NextResponse.json(
        {
          success: false,
          message: "Publikasi tidak ditemukan",
        },
        { status: 404 },
      );
    }

    const downloadUrl = publikasi.fileUrl.replace(
      "/upload/",
      "/upload/fl_attachment/",
    );

    return NextResponse.redirect(downloadUrl);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
