import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

const SHEET_ID = "1yHJCmGakpsyLx16FmWeNIyKp6EzA9Y8VS3aI_D3eTEg";
const GID = "1611675438"; // ganti dengan gid sheet Rekap Data Litmas

interface LitmasRow {
  "NAMA KLIEN"?: string;
  "NO REGISTER"?: string;
  PERKARA?: string;
  "NAMA PK"?: string;
  "ASAL UPT"?: string;
  PENDIDIKAN?: string;
  WILAYAH?: string;
  "TGL TERIMA"?: string;
  STATUS?: string;
  "TGL PENYELESAIAN"?: string;

  [key: string]: string | undefined;
}

export async function GET(req: NextRequest) {
  try {
    const nama = req.nextUrl.searchParams.get("nama")?.trim() ?? "";

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil CSV dari Google Sheet");
    }

    const csv = await response.text();

    // Pisahkan per baris
    const lines = csv.split("\n");

    // Cari baris yang mengandung header NAMA KLIEN
    const headerIndex = lines.findIndex((line) =>
      line.toUpperCase().includes("NAMA KLIEN"),
    );

    if (headerIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Header NAMA KLIEN tidak ditemukan",
        },
        {
          status: 500,
        },
      );
    }

    // Mulai parsing dari header tabel
    const cleanCsv = lines.slice(headerIndex).join("\n");

    const records = parse(cleanCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    }) as LitmasRow[];

    // Debug sementara
    console.log("Header ditemukan di baris:", headerIndex);
    console.log("Jumlah records:", records.length);
    console.log("Columns:", Object.keys(records[0] ?? {}));
    console.log("Sample:", records[0]);

    const hasil = records.filter((item) =>
      (item["NAMA KLIEN"] ?? "").toLowerCase().includes(nama.toLowerCase()),
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
        message: "Gagal mengambil data litmas",
      },
      {
        status: 500,
      },
    );
  }
}
