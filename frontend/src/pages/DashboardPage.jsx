import React from 'react';
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_SUMMARY } from '../data/dummyData';
import StatCard from '../components/dashboard/StatCard';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import RecentActivityTable from '../components/dashboard/RecentActivityTable';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Mode Role: {user?.role?.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {user?.identifier}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Selamat Datang, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ringkasan real-time sistem absensi digital, validasi radius Geolocation, dan aktivitas presensi hari ini.
          </p>
        </div>

        {/* Tombol Aksi Cepat */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/absensi')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Check-In Geolocation</span>
          </button>
          <button
            onClick={() => navigate('/qrcode')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan / Buat QR Code</span>
          </button>
        </div>
      </div>

      {/* 5 Kartu Statistik Utama sesuai spesifikasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Pegawai"
          value={DASHBOARD_SUMMARY.totalPegawai}
          subtitle="Dosen & Staf Aktif"
          badge={DASHBOARD_SUMMARY.pegawaiGrowth}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Mahasiswa"
          value={DASHBOARD_SUMMARY.totalMahasiswa}
          subtitle="Mahasiswa Terdaftar"
          badge={DASHBOARD_SUMMARY.mahasiswaGrowth}
          icon={GraduationCap}
          color="indigo"
        />
        <StatCard
          title="Hadir Hari Ini"
          value={DASHBOARD_SUMMARY.hadirHariIni}
          subtitle="Tepat Waktu (< 08:00)"
          badge={DASHBOARD_SUMMARY.persentaseHadir}
          icon={UserCheck}
          color="emerald"
        />
        <StatCard
          title="Jumlah Terlambat"
          value={DASHBOARD_SUMMARY.terlambatHariIni}
          subtitle="Lewat Batas Toleransi"
          badge={DASHBOARD_SUMMARY.persentaseTerlambat}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Tidak Hadir"
          value={DASHBOARD_SUMMARY.tidakHadirHariIni}
          subtitle="Tanpa Keterangan / Izin"
          badge={DASHBOARD_SUMMARY.persentaseTidakHadir}
          icon={UserX}
          color="rose"
        />
      </div>

      {/* Bagian Tengah: Grafik Statistik (2 Kolom) & Panel Info Geolocation/QR (1 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        {/* Panel Status Geolocation & QR Dinamis */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Titik Geolocation & QR
                </h2>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Parameter validasi jarak absensi dari koordinat pusat institusi.
            </p>

            {/* Detail Lokasi Pusat */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-400">
                  Lokasi Titik Pusat
                </p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  {DASHBOARD_SUMMARY.lokasiUtama.nama}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400">
                    Koordinat GPS
                  </p>
                  <p className="text-xs font-mono font-semibold text-slate-700">
                    {DASHBOARD_SUMMARY.lokasiUtama.latitude},{' '}
                    {DASHBOARD_SUMMARY.lokasiUtama.longitude}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400">
                    Radius Maksimal
                  </p>
                  <p className="text-xs font-bold text-blue-600">
                    {DASHBOARD_SUMMARY.lokasiUtama.radiusMeter} Meter
                  </p>
                </div>
              </div>
            </div>

            {/* Ringkasan Aturan Validasi */}
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Absensi diterima otomatis apabila jarak pengguna{' '}
                  <strong className="text-slate-800">≤ 150 meter</strong> dari titik pusat.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Penolakan otomatis jika di luar radius atau token QR Code telah kadaluarsa.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Update sensor: Real-time
            </span>
            <button
              onClick={() => navigate('/geolocation')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Uji Radius Lokasi</span>
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
