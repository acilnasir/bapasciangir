import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        {
          message: "Invalid Content-Type. Expected application/json",
        },
        { status: 400 },
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    } = body;

    // VALIDASI
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
        },
        { status: 400 },
      );
    }

    // CHECK EMAIL
    const existingAdmin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          message: "Email already registered",
        },
        { status: 400 },
      );
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE ADMIN
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Admin created successfully",
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "Email already exists",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
