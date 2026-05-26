import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";

import cloudinary from "../../../../../lib/cloudinary";

import { UploadApiResponse } from "cloudinary";

// ==============================
// UPDATE WILAYAH
// ==============================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // PARAMS
    const { id } = await params;

    const wilayahId = Number(id);

    // FORM DATA
    const formData = await req.formData();

    const nama = formData.get("nama") as string;

    const file = formData.get("image") as File | null;

    const klienDewasa = Number(formData.get("klienDewasa"));

    const klienAnak = Number(formData.get("klienAnak"));

    // CHECK DATA
    const existing = await prisma.wilayahKerja.findUnique({
      where: {
        id: wilayahId,
      },
    });

    // JIKA DATA TIDAK ADA
    if (!existing) {
      return NextResponse.json(
        {
          message: "Wilayah tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // DEFAULT IMAGE LAMA
    let imageUrl = existing.image;

    // JIKA ADA IMAGE BARU
    if (file && file.size > 0) {
      // BUFFER
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      // UPLOAD CLOUDINARY
      const uploadResponse = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "wilayah-kerja",
              },

              (error, result) => {
                if (error || !result) {
                  reject(error || new Error("Upload gagal"));
                } else {
                  resolve(result);
                }
              },
            )
            .end(buffer);
        },
      );

      imageUrl = uploadResponse.secure_url;
    }

    // UPDATE
    const wilayah = await prisma.wilayahKerja.update({
      where: {
        id: wilayahId,
      },

      data: {
        nama,
        image: imageUrl,
        klienDewasa,
        klienAnak,
      },
    });

    return NextResponse.json(
      {
        message: "Wilayah berhasil diupdate",
        wilayah,
      },
      {
        status: 200,
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
