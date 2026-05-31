import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const data = await prisma.pendidikan.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak ditemukan",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { nama, jenjang, jurusan, tahun } = body;

    const data = await prisma.pendidikan.update({
      where: {
        id,
      },
      data: {
        nama,
        jenjang,
        jurusan,
        tahun,
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
        message: "Gagal mengubah pendidikan",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const pendidikan = await prisma.pendidikan.findUnique({
      where: {
        id,
      },
    });

    if (!pendidikan) {
      return NextResponse.json(
        {
          success: false,
          message: "Data pendidikan tidak ditemukan",
        },
        { status: 404 },
      );
    }

    await prisma.pendidikan.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pendidikan berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus pendidikan",
      },
      { status: 500 },
    );
  }
}
