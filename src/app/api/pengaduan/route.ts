import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const pengaduan = await prisma.pengaduan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: pengaduan,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data pengaduan",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const kontak = formData.get("kontak") as string;
    const kategori = formData.get("kategori") as string;
    const deskripsi = formData.get("deskripsi") as string;

    const file = formData.get("lampiran") as File | null;

    // ======================
    // VALIDATION
    // ======================
    if (!nama || !kontak || !kategori || !deskripsi) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi",
        },
        { status: 400 },
      );
    }

    let lampiranUrl: string | null = null;

    // ======================
    // UPLOAD CLOUDINARY
    // ======================
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "pengaduan",
                resource_type: "auto",
              },
              (
                error: UploadApiErrorResponse | undefined,
                result: UploadApiResponse | undefined,
              ) => {
                if (error) {
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(new Error("Upload gagal"));
                  return;
                }

                resolve(result);
              },
            )
            .end(buffer);
        },
      );

      lampiranUrl = uploadResult.secure_url;
    }

    // ======================
    // SAVE DATABASE
    // ======================
    const pengaduan = await prisma.pengaduan.create({
      data: {
        nama,
        kontak,
        kategori,
        deskripsi,
        lampiran: lampiranUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pengaduan berhasil dikirim",
        data: pengaduan,
      },
      { status: 201 },
    );
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    // VALIDATION
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID pengaduan wajib diisi",
        },
        { status: 400 },
      );
    }

    // CHECK DATA
    const existingPengaduan = await prisma.pengaduan.findUnique({
      where: {
        id,
      },
    });

    if (!existingPengaduan) {
      return NextResponse.json(
        {
          success: false,
          message: "Data pengaduan tidak ditemukan",
        },
        { status: 404 },
      );
    }

    // ======================
    // DELETE CLOUDINARY FILE
    // ======================
    if (existingPengaduan.lampiran) {
      try {
        const urlParts = existingPengaduan.lampiran.split("/");

        const fileName = urlParts[urlParts.length - 1].split(".")[0];

        const publicId = `pengaduan/${fileName}`;

        await cloudinary.uploader.destroy(publicId, {
          resource_type: "auto",
        });
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
      }
    }

    // ======================
    // DELETE DATABASE
    // ======================
    await prisma.pengaduan.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pengaduan berhasil dihapus",
      },
      { status: 200 },
    );
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
