import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const data = await prisma.pendidikan.findMany({
      include: {
        profil: true,
      },
      orderBy: {
        tahun: "desc",
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
        message: "Gagal mengambil data pendidikan",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nama, tahun, jurusan, jenjang, profilId } = body;

    const data = await prisma.pendidikan.create({
      data: {
        nama,
        tahun,
        jenjang,
        jurusan,
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
        message: "Gagal menambahkan pendidikan",
      },
      { status: 500 },
    );
  }
}
