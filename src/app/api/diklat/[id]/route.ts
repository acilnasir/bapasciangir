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

    const data = await prisma.diklat.findUnique({
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

    const { nama, tahun } = body;

    const data = await prisma.diklat.update({
      where: {
        id,
      },
      data: {
        nama,
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
        message: "Gagal mengubah diklat",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const riwayatDiklat = await prisma.diklat.findUnique({
      where: {
        id,
      },
    });

    if (!riwayatDiklat) {
      return NextResponse.json(
        {
          success: false,
          message: "Data jabatan tidak ditemukan",
        },
        { status: 404 },
      );
    }

    await prisma.diklat.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "diklat berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus diklat",
      },
      { status: 500 },
    );
  }
}
