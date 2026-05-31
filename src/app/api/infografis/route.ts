import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const data = await prisma.dashboard.findMany({
      include: {
        jenisPidana: true,
        klien: true,
        litmas: true,
        pendampingan: true,
        sdm: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch dashboard",
        error,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const dashboard = await prisma.dashboard.create({
      data: {
        jenisPidana: {
          create: body.jenisPidana,
        },

        klien: {
          create: body.klien,
        },

        litmas: {
          create: body.litmas,
        },

        pendampingan: {
          create: body.pendampingan,
        },

        sdm: {
          create: body.sdm,
        },
      },

      include: {
        jenisPidana: true,
        klien: true,
        litmas: true,
        pendampingan: true,
        sdm: true,
      },
    });

    return NextResponse.json(dashboard, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create dashboard",
        error,
      },
      { status: 500 },
    );
  }
}
