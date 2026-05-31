import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // UPDATE JENIS PIDANA
    await Promise.all(
      body.jenisPidana.map(
        (item: { id: string; label: string; value: number }) =>
          prisma.jenisPidana.update({
            where: {
              id: item.id,
            },
            data: {
              label: item.label,
              value: Number(item.value),
            },
          }),
      ),
    );

    // UPDATE KLIEN
    await prisma.klienSummary.update({
      where: {
        dashboardId: id,
      },
      data: body.klien,
    });

    // UPDATE LITMAS
    await prisma.litmas.update({
      where: {
        dashboardId: id,
      },
      data: body.litmas,
    });

    // UPDATE PENDAMPINGAN
    await prisma.pendampingan.update({
      where: {
        dashboardId: id,
      },
      data: body.pendampingan,
    });

    // UPDATE SDM
    await prisma.sDM.update({
      where: {
        dashboardId: id,
      },
      data: body.sdm,
    });

    // trigger updatedAt
    await prisma.dashboard.update({
      where: {
        id,
      },
      data: {},
    });

    const result = await prisma.dashboard.findUnique({
      where: {
        id,
      },
      include: {
        jenisPidana: true,
        klien: true,
        litmas: true,
        pendampingan: true,
        sdm: true,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update dashboard",
        error,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.dashboard.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete dashboard",
        error,
      },
      { status: 500 },
    );
  }
}
