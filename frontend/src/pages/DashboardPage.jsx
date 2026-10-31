import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  UserCheck,
  Clock,
  UserX,
  MapPin,
  QrCode,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
  Navigation,
  Sparkles,
  Radio,
  Compass,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_SUMMARY } from '../data/dummyData';
import StatCard from '../components/dashboard/StatCard';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import RecentActivityTable from '../components/dashboard/RecentActivityTable';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quickModal, setQuickModal] = useState(null); // 'checkin' | 'qr' | null

  return (
    <div className="space-y-6">
      {/* Modern Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-lg overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                Role Aktif: {user?.role?.toUpperCase()}
              </span>
              <span className="text-xs text-blue-200/80 font-mono bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
                {user?.identifier}
              </span>
              <span className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Radius Kampus Terhubung
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang, {user?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1.5 leading-relaxed">
              Pantau tingkat kehadiran pegawai & mahasiswa secara real-time, validasi titik
              koordinat Geolocation GPS, dan kelola sesi QR Code dinamis dalam satu panel terpadu.
            </p>
          </div>

          {/* Tombol Aksi Cepat Interaktif */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setQuickModal('checkin')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Simulasi Check-In GPS</span>
            </button>
            <button
              onClick={() => setQuickModal('qr')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-blue-300" />
              <span>Preview QR Dinamis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Preview Cepat untuk Pengalaman UI/UX Interaktif */}
      {quickModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {quickModal === 'checkin' ? (
                    <MapPin className="w-5 h-5" />
                  ) : (
                    <QrCode className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {quickModal === 'checkin'
                      ? 'Status Sensor Geolocation GPS'
                      : 'Token QR Code Presensi Dinamis'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Preview Interaktif SmartPresence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setQuickModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quickModal === 'checkin' ? (
              <div className="py-5 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-900">
                    <p className="font-bold">Anda Berada di Dalam Zona Radius!</p>
                    <p className="mt-0.5 text-emerald-700">
                      Jarak terdeteksi: <strong>21 Meter</strong> dari Gedung Rektorat
                      (Batas maksimal: 150 Meter).
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-slate-400 block">
                      Latitude
                    </span>
                    <span className="font-bold text-slate-800">-6.200085</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-slate-400 block">
                      Longitude
                    </span>
                    <span className="font-bold text-slate-800">106.816692</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-5 flex flex-col items-center text-center">
                {/* Visualisasi Simulasi Matrix QR */}
                <div className="w-44 h-44 p-4 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                  <QrCode className="w-28 h-28 text-blue-400" />
                  <span className="text-[10px] font-mono text-emerald-300 mt-1">
                    SP-2026-TOKEN-89A
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mt-4">
                  Token QR Berlakunya Diperbarui Setiap 60 Detik
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Modul pemindaian penuh akan diaktifkan pada tahap pengembangan QR Code.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setQuickModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const target = quickModal === 'checkin' ? '/absensi' : '/qrcode';
                  setQuickModal(null);
                  navigate(target);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                Buka Modul Penuh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5 Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Pegawai"
          value={DASHBOARD_SUMMARY.totalPegawai}
          subtitle="Dosen & Staf Aktif"
          badge={DASHBOARD_SUMMARY.pegawaiGrowth}
          icon={Users}
          color="blue"
          progress={92}
        />
        <StatCard
          title="Total Mahasiswa"
          value={DASHBOARD_SUMMARY.totalMahasiswa}
          subtitle="Mahasiswa Terdaftar"
          badge={DASHBOARD_SUMMARY.mahasiswaGrowth}
          icon={GraduationCap}
          color="indigo"
          progress={88}
        />
        <StatCard
          title="Hadir Hari Ini"
          value={DASHBOARD_SUMMARY.hadirHariIni}
          subtitle="Tepat Waktu (< 08:00)"
          badge={DASHBOARD_SUMMARY.persentaseHadir}
          icon={UserCheck}
          color="emerald"
          progress={85}
        />
        <StatCard
          title="Jumlah Terlambat"
          value={DASHBOARD_SUMMARY.terlambatHariIni}
          subtitle="Melewati Jam Masuk"
          badge={DASHBOARD_SUMMARY.persentaseTerlambat}
          icon={Clock}
          color="amber"
          progress={24}
        />
        <StatCard
          title="Tidak Hadir"
          value={DASHBOARD_SUMMARY.tidakHadirHariIni}
          subtitle="Tanpa Keterangan / Izin"
          badge={DASHBOARD_SUMMARY.persentaseTidakHadir}
          icon={UserX}
          color="rose"
          progress={15}
        />
      </div>

      {/* Bagian Tengah: Grafik Statistik (2 Kolom) & Radar Geolocation Live (1 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        {/* Panel Visual Radar Geolocation & Radius */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    Radar Geofencing GPS
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Pemetaan radius presensi aktif
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Radio className="w-3 h-3 animate-pulse" />
                Aktif
              </span>
            </div>

            {/* Visual Radar Map Card */}
            <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[190px] border border-slate-800">
              {/* Lingkaran Konsentris Radar */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/35 animate-pulse" />
                <div className="absolute inset-5 rounded-full border border-blue-400/40 bg-blue-500/5" />
                <div className="absolute inset-10 rounded-full border border-emerald-400/50 bg-emerald-500/15" />

                {/* Titik Pusat */}
                <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-400/40 z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Simulasi Pin User Valid */}
                <div className="absolute top-5 right-6 bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                  ✓ 18m
                </div>
                <div className="absolute bottom-6 left-5 bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                  ✓ 41m
                </div>
                {/* Simulasi Pin User Luar Radius */}
                <div className="absolute -top-1 left-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                  ✕ 210m
                </div>
              </div>

              <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-300 mt-2 pt-2 border-t border-white/10">
                <span>Pusat: {DASHBOARD_SUMMARY.lokasiUtama.latitude}, {DASHBOARD_SUMMARY.lokasiUtama.longitude}</span>
                <span className="text-emerald-400 font-bold">
                  Max: {DASHBOARD_SUMMARY.lokasiUtama.radiusMeter}m
                </span>
              </div>
            </div>

            {/* Ringkasan Aturan Validasi */}
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Presensi <strong className="text-slate-800">Disetujui</strong> bila jarak
                  koordinat pengguna ≤ {DASHBOARD_SUMMARY.lokasiUtama.radiusMeter}m.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Presensi <strong className="text-slate-800">Ditolak Otomatis</strong> jika
                  di luar zona radius atau QR expired.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">
              Akurasi GPS: Tinggi (±5m)
            </span>
            <button
              onClick={() => navigate('/geolocation')}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <span>Konfigurasi Lokasi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabel Aktivitas Absensi Terbaru */}
      <RecentActivityTable />
    </div>
  );
};

export default DashboardPage;
