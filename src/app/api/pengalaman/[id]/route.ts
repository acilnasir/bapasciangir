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

    const data = await prisma.pengalamanInternasional.findUnique({
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

    const data = await prisma.pengalamanInternasional.update({
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
        message: "Gagal mengubah riwayat Pengalaman",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const riwayatPengalaman = await prisma.pengalamanInternasional.findUnique({
      where: {
        id,
      },
    });

    if (!riwayatPengalaman) {
      return NextResponse.json(
        {
          success: false,
          message: "Data Pengalaman tidak ditemukan",
        },
        { status: 404 },
      );
    }

    await prisma.pengalamanInternasional.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Riwayat Pengalaman berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus Pengalaman",
      },
      { status: 500 },
    );
  }
}
