import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const file = formData.get("file") as File;

    // ======================
    // VALIDATION
    // ======================
    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi",
        },
        { status: 400 },
      );
    }

    // ======================
    // VALIDASI FILE
    // ======================
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File wajib diupload",
        },
        { status: 400 },
      );
    }

    // VALIDASI FORMAT FILE
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format file hanya PDF, PNG, JPG, JPEG",
        },
        { status: 400 },
      );
    }

    // VALIDASI UKURAN FILE (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Ukuran file maksimal 5MB",
        },
        { status: 400 },
      );
    }

    // ======================
    // CONVERT FILE
    // ======================
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ======================
    // UPLOAD CLOUDINARY
    // ======================
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "publikasi",

              // NAMA FILE
              public_id: title.toLowerCase().replace(/\s+/g, "-"),

              resource_type: "auto",

              // HINDARI NAMA DUPLIKAT
              unique_filename: true,
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

    // ======================
    // SAVE DATABASE
    // ======================

    const extension = file.name.split(".").pop();

    const safeFileName = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")}.${extension}`;

    const publikasi = await prisma.publikasi.create({
      data: {
        title,
        description,
        fileUrl: uploadResult.secure_url,
        fileName: safeFileName,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Publikasi berhasil ditambahkan",
        data: publikasi,
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

export async function GET() {
  try {
    const publikasi = await prisma.publikasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: publikasi,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data publikasi",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID publikasi wajib diisi",
        },
        { status: 400 },
      );
    }

    // ======================
    // CHECK DATA
    // ======================
    const publikasi = await prisma.publikasi.findUnique({
      where: {
        id,
      },
    });

    if (!publikasi) {
      return NextResponse.json(
        {
          success: false,
          message: "Publikasi tidak ditemukan",
        },
        { status: 404 },
      );
    }

    // ======================
    // DELETE CLOUDINARY FILE
    // ======================
    try {
      const splitUrl = publikasi.fileUrl.split("/");
      const fileName = splitUrl[splitUrl.length - 1];

      const publicId = `publikasi/${fileName.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "auto",
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);
    }

    // ======================
    // DELETE DATABASE
    // ======================
    await prisma.publikasi.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Publikasi berhasil dihapus",
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
