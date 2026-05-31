import DiklatSection from "@/app/components/admin/DiklatSection";
import JabatanSection from "@/app/components/admin/JabatanSection";
import KinerjaSection from "@/app/components/admin/KinerjaSection";

import OrganisasiSection from "@/app/components/admin/OrganisasiSection";
import PendidikanSection from "@/app/components/admin/PendidikanSection";
import PengalamanSection from "@/app/components/admin/PengalamanSection";
import PenghargaanSection from "@/app/components/admin/PenghargaanSection";
import PrestasiSection from "@/app/components/admin/PrestasiSection";
import ProfilKabapasPage from "@/app/components/admin/ProfilKabapasForm";

async function getProfil() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profil-kabapas`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const json = await res.json();

  return json.data;
}

export default async function AdminProfilKabapasPage() {
  const profil = await getProfil();

  if (!profil) {
    return (
      <div className="p-6">
        <p>Data profil belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <ProfilKabapasPage />

      <PendidikanSection
        profilId={profil.id}
        initialData={profil.riwayatPendidikan}
      />

      <JabatanSection
        profilId={profil.id}
        initialData={profil.riwayatJabatan}
      />

      <PenghargaanSection
        profilId={profil.id}
        initialData={profil.penghargaan}
      />

      <DiklatSection profilId={profil.id} initialData={profil.diklat} />

      <OrganisasiSection profilId={profil.id} initialData={profil.organisasi} />

      <PengalamanSection profilId={profil.id} initialData={profil.pengalaman} />

      <PrestasiSection profilId={profil.id} initialData={profil.prestasi} />

      <KinerjaSection profilId={profil.id} initialData={profil.kinerja} />
    </div>
  );
}
