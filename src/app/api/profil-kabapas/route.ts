import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import cloudinary from "../../../../lib/cloudinary";

export async function GET() {
  try {
    const data = await prisma.profilKepalaBapas.findFirst({
      include: {
        riwayatPendidikan: true,
        riwayatJabatan: true,
        penghargaan: true,
        diklat: true,
        organisasi: true,
        pengalaman: true,
        prestasi: true,
        kinerja: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const jabatan = formData.get("jabatan") as string;
    const pangkat = formData.get("pangkat") as string;
    const pendidikan = formData.get("pendidikan") as string;

    const foto = formData.get("foto") as File | null;

    let fotoUrl = "";

    if (foto) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{
        secure_url: string;
      }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "profil-kepala-bapas",
            },
            (error, result) => {
              if (error) reject(error);

              resolve(result as { secure_url: string });
            },
          )
          .end(buffer);
      });

      fotoUrl = uploadResult.secure_url;
    }

    const data = await prisma.profilKepalaBapas.create({
      data: {
        nama,
        jabatan,
        pangkat,
        pendidikan,
        foto: fotoUrl,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal membuat profil" },
      { status: 500 },
    );
  }
}
