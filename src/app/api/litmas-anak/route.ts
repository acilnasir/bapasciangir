import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

const SHEET_ID = "1yHJCmGakpsyLx16FmWeNIyKp6EzA9Y8VS3aI_D3eTEg";
const GID = "1536287586";

export async function GET() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    const csv = await response.text();

    const lines = csv.split("\n");

    const headerIndex = lines.findIndex((line) =>
      line.toLowerCase().includes("nama klien"),
    );

    if (headerIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Header Nama Klien tidak ditemukan",
        },
        { status: 500 },
      );
    }

    const cleanCsv = lines.slice(headerIndex).join("\n");

    const records = parse(cleanCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data Litmas Anak",
      },
      {
        status: 500,
      },
    );
  }
}
