import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

const SHEET_ID = "1yHJCmGakpsyLx16FmWeNIyKp6EzA9Y8VS3aI_D3eTEg";

const GID = "1611675438";

export async function GET() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    const csv = await response.text();

    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Gagal mengambil data",
      },
      {
        status: 500,
      },
    );
  }
}
