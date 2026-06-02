import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

const SHEET_ID = "1yHJCmGakpsyLx16FmWeNIyKp6EzA9Y8VS3aI_D3eTEg";
const GID = "1536287586";

interface LitmasAnakRow {
  "Nama Klien"?: string;
  "Asal Permintaan"?: string;
  "Tanggal Penerimaan"?: string;
  "Jenis Litmas"?: string;
  "No. Reg"?: string;
  PK?: string;
  "Status Litmas"?: string;
  "Tanggal Selesai"?: string;
  "Proses Hukum"?: string;
  Hasil?: string;
  Keterangan?: string;

  [key: string]: string | undefined;
}

export async function GET(req: NextRequest) {
  try {
    const nama = req.nextUrl.searchParams.get("nama")?.trim() ?? "";

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
    }) as LitmasAnakRow[];

    const hasil = records.filter((item) =>
      (item["Nama Klien"] ?? "").toLowerCase().includes(nama.toLowerCase()),
    );

    return NextResponse.json({
      success: true,
      keyword: nama,
      total: hasil.length,
      data: hasil,
    });
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
