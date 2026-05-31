import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const data = await prisma.prestasi.findMany({
      include: {
        profil: true,
      },
      orderBy: {
        nama: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data prestasi",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nama, profilId } = body;

    const data = await prisma.prestasi.create({
      data: {
        nama,

        profilId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan prestasi",
      },
      { status: 500 },
    );
  }
}
