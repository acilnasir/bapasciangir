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

    const data = await prisma.kinerja.findUnique({
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

    const { nama, hasil } = body;

    const data = await prisma.kinerja.update({
      where: {
        id,
      },
      data: {
        nama,
        hasil,
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
        message: "Gagal mengubah kinerja",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const riwayatkinerja = await prisma.kinerja.findUnique({
      where: {
        id,
      },
    });

    if (!riwayatkinerja) {
      return NextResponse.json(
        {
          success: false,
          message: "Data jabatan tidak ditemukan",
        },
        { status: 404 },
      );
    }

    await prisma.kinerja.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "kinerja berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus kinerja",
      },
      { status: 500 },
    );
  }
}
