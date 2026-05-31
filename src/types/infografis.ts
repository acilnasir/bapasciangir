export type JenisPidana = {
  id: string;
  label: string;
  value: number;
};

export type Klien = {
  apelCB: number;
  apelCMB: number;
  apelPB: number;
  apelPIB: number;
  baruCB: number;
  baruCMB: number;
  baruPB: number;
  baruPIB: number;
};

export type Litmas = {
  dewasaPB: number;
  dewasaCB: number;
  dewasaCMB: number;
  dewasaPembinaanAwal: number;
  dewasaPerubahan: number;
  dewasaMutasi: number;
  dewasaPraAjudikasi: number;

  anakSidang: number;
  anakDiversi: number;
  anakPB: number;
  anakCB: number;
  anakPembinaanAwal: number;
  anakKorban: number;
  anakKurang12Tahun: number;
};

export type Pendampingan = {
  diversi: number;
  sidang: number;
  pengakhiran: number;
  pencabutan: number;
  pelimpahan: number;
};

export type SDM = {
  hadir: number;
  cuti: number;
  dinasLuar: number;
  posBapas: number;
  tanpaKeterangan: number;
};

export type Dashboard = {
  id: string;
  jenisPidana: JenisPidana[];
  klien: Klien;
  litmas: Litmas;
  pendampingan: Pendampingan;
  sdm: SDM;
};
