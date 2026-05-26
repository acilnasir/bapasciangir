import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../../../lib/cloudinary";

// ==============================
// GET ALL
// ==============================
export async function GET() {
  try {
    const wilayah = await prisma.wilayahKerja.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(wilayah, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data wilayah kerja",
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

    const nama = formData.get("nama") as string;

    const file = formData.get("image") as File;

    const klienDewasa = Number(formData.get("klienDewasa"));

    const klienAnak = Number(formData.get("klienAnak"));

    // VALIDASI
    if (!nama || !file) {
      return NextResponse.json(
        {
          message: "Nama dan image wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // CHECK DUPLIKAT
    const existing = await prisma.wilayahKerja.findUnique({
      where: {
        nama,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Wilayah sudah ada",
        },
        {
          status: 400,
        },
      );
    }

    // FILE BUFFER
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

    // CREATE DATA
    const wilayah = await prisma.wilayahKerja.create({
      data: {
        nama,
        image: uploadResponse.secure_url,
        klienDewasa,
        klienAnak,
      },
    });

    return NextResponse.json(
      {
        message: "Wilayah berhasil dibuat",
        wilayah,
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
