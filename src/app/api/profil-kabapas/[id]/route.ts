import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import cloudinary from "../../../../../lib/cloudinary";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const data = await prisma.profilKepalaBapas.findUnique({
      where: {
        id,
      },
      include: {
        riwayatPendidikan: true,
        riwayatJabatan: true,
        penghargaan: true,
        diklat: true,
        organisasi: true,
        pengalaman: true,
        prestasi: true,
      },
    });

    if (!data) {
      return NextResponse.json(
        { message: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const jabatan = formData.get("jabatan") as string;
    const pangkat = formData.get("pangkat") as string;
    const pendidikan = formData.get("pendidikan") as string;

    const foto = formData.get("foto") as File | null;

    let fotoUrl: string | undefined;

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

    const data = await prisma.profilKepalaBapas.update({
      where: {
        id,
      },
      data: {
        nama,
        jabatan,
        pangkat,
        pendidikan,
        ...(fotoUrl && { foto: fotoUrl }),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal update profil" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.profilKepalaBapas.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Profil berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal menghapus profil" },
      { status: 500 },
    );
  }
}
