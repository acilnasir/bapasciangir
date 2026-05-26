import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import cloudinary from "../../../../../lib/cloudinary";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ======================
// GET BERITA DETAIL
// ======================
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const berita = await prisma.berita.findUnique({
      where: {
        id,
      },

      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!berita) {
      return NextResponse.json(
        {
          error: "Berita tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        data: berita,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================
// UPDATE BERITA
// ======================
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // FORM DATA
    const formData = await req.formData();

    const title = formData.get("title") as string;

    const excerpt = formData.get("excerpt") as string;

    const content = formData.get("content") as string;

    const category = formData.get("category") as string;

    const author = formData.get("author") as string;

    const image = formData.get("image") as File | null;

    // CHECK BERITA
    const berita = await prisma.berita.findUnique({
      where: {
        id,
      },
    });

    if (!berita) {
      return NextResponse.json(
        {
          error: "Berita tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // DEFAULT THUMBNAIL
    let thumbnail = berita.thumbnail;

    // UPLOAD IMAGE BARU
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "berita",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else if (result) {
                  resolve(result);
                }
              },
            )
            .end(buffer);
        },
      );

      thumbnail = uploadResult.secure_url;
    }

    // UPDATE
    const updatedBerita = await prisma.berita.update({
      where: {
        id,
      },

      data: {
        title,
        excerpt,
        content,
        category,
        author,
        thumbnail,
      },
    });

    return NextResponse.json(
      {
        message: "Berita berhasil diupdate",

        data: updatedBerita,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================
// DELETE BERITA
// ======================
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // CHECK BERITA
    const berita = await prisma.berita.findUnique({
      where: {
        id,
      },
    });

    if (!berita) {
      return NextResponse.json(
        {
          error: "Berita tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // DELETE RELATION TAGS
    await prisma.beritaTag.deleteMany({
      where: {
        beritaId: id,
      },
    });

    // DELETE BERITA
    await prisma.berita.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Berita berhasil dihapus",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      },
    );
  }
}
