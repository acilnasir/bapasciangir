import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// ==============================
// UPDATE
// ==============================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // FORM DATA
    const formData = await req.formData();

    const tahun = Number(formData.get("tahun"));

    const totalAnggaran = BigInt(formData.get("totalAnggaran") as string);

    const realisasi = BigInt(formData.get("realisasi") as string);

    // CHECK DATA
    const existing = await prisma.anggaran.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "Data tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // UPDATE
    const updated = await prisma.anggaran.update({
      where: {
        id,
      },

      data: {
        tahun,

        totalAnggaran,

        realisasi,
      },
    });

    return NextResponse.json({
      message: "Anggaran berhasil diupdate",

      data: {
        ...updated,

        totalAnggaran: updated.totalAnggaran.toString(),

        realisasi: updated.realisasi.toString(),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

// ==============================
// DELETE
// ==============================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // CHECK DATA
    const existing = await prisma.anggaran.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          message: "Data tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // DELETE
    await prisma.anggaran.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Anggaran berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
