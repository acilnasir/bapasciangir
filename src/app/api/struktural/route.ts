import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

const prisma = new PrismaClient();

/* =========================================================
   CLOUDINARY UPLOAD HELPER
========================================================= */
const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "pejabat-struktural",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        },
      )
      .end(buffer);
  });
};

/* =========================================================
   GET - ambil semua data pejabat (urut struktur)
========================================================= */
export async function GET() {
  try {
    const data = await prisma.pejabatStruktural.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

/* =========================================================
   POST - create pejabat
========================================================= */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const jabatan = formData.get("jabatan") as
      | "KABAPAS"
      | "KASUBSI_BKD"
      | "KASUBSI_BKA"
      | "KAUR_TU";

    const foto = formData.get("foto") as File | null;

    if (!nama || !jabatan) {
      return NextResponse.json(
        { error: "Nama dan jabatan wajib diisi" },
        { status: 400 },
      );
    }

    let fotoUrl: string | null = null;

    if (foto) {
      const buffer = Buffer.from(await foto.arrayBuffer());
      const uploadResult = await uploadToCloudinary(buffer);
      fotoUrl = uploadResult.secure_url;
    }

    const result = await prisma.pejabatStruktural.create({
      data: {
        nama,
        jabatan,
        foto: fotoUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

/* =========================================================
   PUT - update pejabat
========================================================= */
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const nama = formData.get("nama") as string;
    const jabatan = formData.get("jabatan") as
      | "KABAPAS"
      | "KASUBSI_BKD"
      | "KASUBSI_BKA"
      | "KAUR_TU";

    const foto = formData.get("foto") as File | null;

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    const existing = await prisma.pejabatStruktural.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    let fotoUrl = existing.foto;

    if (foto) {
      const buffer = Buffer.from(await foto.arrayBuffer());
      const uploadResult = await uploadToCloudinary(buffer);
      fotoUrl = uploadResult.secure_url;
    }

    const updated = await prisma.pejabatStruktural.update({
      where: { id },
      data: {
        nama: nama ?? existing.nama,
        jabatan: jabatan ?? existing.jabatan,
        foto: fotoUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
