import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// ======================
// GET
// ======================
export async function GET() {
  try {
    const survey = await prisma.survey.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: survey,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data survey",
      },
      { status: 500 },
    );
  }
}

// ======================
// POST
// ======================
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const label = formData.get("label") as string;
    const title = formData.get("title") as string;
    const score = Number(formData.get("score"));
    const period = formData.get("period") as string;
    const respondents = formData.get("respondents") as string;

    // ======================
    // VALIDATION
    // ======================
    if (!label || !title || !score || !period) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi",
        },
        { status: 400 },
      );
    }

    // ======================
    // CREATE
    // ======================
    const survey = await prisma.survey.create({
      data: {
        label,
        title,
        score,
        period,
        respondents,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Survey berhasil ditambahkan",
        data: survey,
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

// ======================
// PUT
// ======================
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;

    const label = formData.get("label") as string;
    const title = formData.get("title") as string;
    const score = Number(formData.get("score"));
    const period = formData.get("period") as string;
    const respondents = formData.get("respondents") as string;

    // ======================
    // VALIDATION
    // ======================
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID wajib diisi",
        },
        { status: 400 },
      );
    }

    // ======================
    // CHECK DATA
    // ======================
    const existingSurvey = await prisma.survey.findUnique({
      where: {
        id,
      },
    });

    if (!existingSurvey) {
      return NextResponse.json(
        {
          success: false,
          message: "Survey tidak ditemukan",
        },
        { status: 404 },
      );
    }

    // ======================
    // UPDATE
    // ======================
    const updatedSurvey = await prisma.survey.update({
      where: {
        id,
      },
      data: {
        label,
        title,
        score,
        period,
        respondents,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Survey berhasil diupdate",
        data: updatedSurvey,
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

// ======================
// DELETE
// ======================
export async function DELETE(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;

    // ======================
    // VALIDATION
    // ======================
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID wajib diisi",
        },
        { status: 400 },
      );
    }

    // ======================
    // CHECK DATA
    // ======================
    const existingSurvey = await prisma.survey.findUnique({
      where: {
        id,
      },
    });

    if (!existingSurvey) {
      return NextResponse.json(
        {
          success: false,
          message: "Survey tidak ditemukan",
        },
        { status: 404 },
      );
    }

    // ======================
    // DELETE
    // ======================
    await prisma.survey.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Survey berhasil dihapus",
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
