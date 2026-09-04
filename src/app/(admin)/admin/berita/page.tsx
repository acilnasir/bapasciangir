import BeritaForm from "@/app/components/admin/BeritaForm";
import BeritaTable from "@/app/components/admin/BeritaTable";

export default function AdminBeritaPage() {
  return (
    <section>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Dashboard Berita</h1>
        <p className="mt-2 text-gray-600">Kelola berita Bapas Ciangir.</p>
      </div>

      {/* FORM */}
      <BeritaForm />

      {/* TABLE */}
      <div className="mt-10">
        <BeritaTable />
      </div>
    </section>
  );
}
