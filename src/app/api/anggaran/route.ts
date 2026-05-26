import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// ==============================
// GET ALL
// ==============================
export async function GET() {
  try {
    const anggaran = await prisma.anggaran.findMany({
      orderBy: {
        tahun: "desc",
      },
    });

    // SERIALIZE BIGINT
    const serialized = anggaran.map((item) => ({
      ...item,

      totalAnggaran: item.totalAnggaran.toString(),

      realisasi: item.realisasi.toString(),
    }));

    return NextResponse.json(serialized);
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
// CREATE
// ==============================
export async function POST(req: NextRequest) {
  try {
    // FORM DATA
    const formData = await req.formData();

    const tahun = Number(formData.get("tahun"));

    const totalAnggaran = BigInt(formData.get("totalAnggaran") as string);

    const realisasi = BigInt(formData.get("realisasi") as string);

    // VALIDASI
    if (!tahun || !totalAnggaran || !realisasi) {
      return NextResponse.json(
        {
          message: "Semua field wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // CHECK EXISTING
    const existing = await prisma.anggaran.findFirst({
      where: {
        tahun,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Data tahun sudah ada",
        },
        {
          status: 400,
        },
      );
    }

    // CREATE
    const anggaran = await prisma.anggaran.create({
      data: {
        tahun,

        totalAnggaran,

        realisasi,
      },
    });

    return NextResponse.json(
      {
        message: "Anggaran berhasil dibuat",

        data: {
          ...anggaran,

          totalAnggaran: anggaran.totalAnggaran.toString(),

          realisasi: anggaran.realisasi.toString(),
        },
      },
      {
        status: 201,
      },
    );
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
