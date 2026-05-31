import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const pengaduan = await prisma.pengaduan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pengaduan");

    worksheet.columns = [
      { header: "No", key: "no", width: 10 },
      { header: "Nama", key: "nama", width: 30 },
      { header: "Kontak", key: "kontak", width: 25 },
      { header: "Kategori", key: "kategori", width: 25 },
      { header: "Deskripsi", key: "deskripsi", width: 60 },
      { header: "Lampiran", key: "lampiran", width: 50 },
      { header: "Tanggal", key: "tanggal", width: 25 },
    ];

    pengaduan.forEach((item, index) => {
      worksheet.addRow({
        no: index + 1,
        nama: item.nama,
        kontak: item.kontak,
        kategori: item.kategori,
        deskripsi: item.deskripsi,
        lampiran: item.lampiran ?? "-",
        tanggal: new Date(item.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      });
    });

    worksheet.getRow(1).font = {
      bold: true,
    };

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="data-pengaduan.xlsx"',
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal export excel",
      },
      {
        status: 500,
      },
    );
  }
}
