import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import slugify from "slugify";

import cloudinary from "../../../../lib/cloudinary";

import type { UploadApiResponse } from "cloudinary";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // FORM DATA
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;

    const category = formData.get("category") as string;
    const author = formData.get("author") as string;

    const image = formData.get("image") as File;

    const tags =
      (formData.get("tags") as string)?.split(",").map((tag) => tag.trim()) ||
      [];

    // VALIDATION
    if (!title || !excerpt || !content || !category || !author || !image) {
      return NextResponse.json(
        {
          error: "Semua field wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // CREATE SLUG
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    // FILE BUFFER
    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // UPLOAD TO CLOUDINARY
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

    // IMAGE URL
    const thumbnail = uploadResult.secure_url;

    // CREATE BERITA
    const berita = await prisma.berita.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        thumbnail,
        category,
        author,

        tags: {
          create: await Promise.all(
            tags.map(async (tagName) => {
              // CHECK TAG EXIST
              let tag = await prisma.tag.findUnique({
                where: {
                  name: tagName,
                },
              });

              // CREATE TAG IF NOT EXIST
              if (!tag) {
                tag = await prisma.tag.create({
                  data: {
                    name: tagName,
                  },
                });
              }

              return {
                tag: {
                  connect: {
                    id: tag.id,
                  },
                },
              };
            }),
          ),
        },
      },

      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Berita berhasil dibuat",
        data: berita,
      },
      {
        status: 201,
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

// GET ALL BERITA
export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Berhasil mengambil data berita",
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
        error: "Gagal mengambil data berita",
      },
      {
        status: 500,
      },
    );
  }
}
