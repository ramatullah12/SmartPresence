import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  LogOut,
  Clock,
  Calendar,
  UserCheck,
  ChevronDown,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard Analitik', subtitle: 'Monitoring presensi & geolocation real-time' },
  '/absensi': { title: 'Sistem Absensi', subtitle: 'Check-In, Check-Out & pencatatan kehadiran otomatis' },
  '/pegawai': { title: 'Manajemen Pegawai', subtitle: 'Kelola data dosen dan staf institusi' },
  '/mahasiswa': { title: 'Manajemen Mahasiswa', subtitle: 'Kelola data NIM, program studi & kelas' },
  '/geolocation': { title: 'Geolocation & Radius GPS', subtitle: 'Validasi koordinat pengguna terhadap titik pusat' },
  '/qrcode': { title: 'QR Code Dinamis', subtitle: 'Generator & pemindaian token QR berbatas waktu' },
  '/laporan': { title: 'Laporan Kehadiran', subtitle: 'Rekapitulasi presensi & export Excel/PDF' },
};

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Presensi QR Terverifikasi',
    desc: 'Dimas Pratama Putra berhasil check-in pada jarak 18m.',
    time: '2 menit lalu',
    type: 'success',
  },
  {
    id: 2,
    title: 'Peringatan Keterlambatan',
    desc: 'Aulia Rahman Hakim check-in melewati pukul 08:00 WIB.',
    time: '14 menit lalu',
    type: 'warning',
  },
  {
    id: 3,
    title: 'Token QR Code Diperbarui',
    desc: 'Sistem merotasi sesi QR Code kelas TI-3A secara otomatis.',
    time: '30 menit lalu',
    type: 'info',
  },
];

const Navbar = ({ onOpenSidebar }) => {
  const { user, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentPage = PAGE_TITLES[location.pathname] || PAGE_TITLES['/dashboard'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formattedDate = currentTime.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pegawai':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'mahasiswa':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Hamburger + Dynamic Page Title & Search */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block truncate">
          <h2 className="text-sm font-bold text-slate-900 leading-tight truncate">
            {currentPage.title}
          </h2>
          <p className="text-[11px] text-slate-400 font-medium truncate">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Quick Search Input */}
        <div className="hidden md:flex items-center relative w-56 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari NIP, NIM, atau log..."
            className="w-full pl-9 pr-12 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white rounded border border-slate-200">
            ⌘K
          </kbd>
        </div>

        {/* Live Digital Clock Pill */}
        <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            {formattedDate}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-800 font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            {formattedTime} WIB
          </span>
        </div>

        {/* Simulasi Role Switcher Cepat (Segmen Modern) */}
        <div className="hidden sm:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-bold uppercase text-slate-400 px-2 hidden lg:inline">
            Role:
          </span>
          {['admin', 'pegawai', 'mahasiswa'].map((r) => (
            <button
              key={r}
              onClick={() => switchDemoRole(r)}
              title={`Uji tampilan & hak akses sebagai ${r.toUpperCase()}`}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                user?.role === r
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setDropdownOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50/60 transition-colors cursor-pointer"
            title="Notifikasi Sistem"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-20 animate-fade-in">
                <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Notifikasi Presensi Live
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                    3 Baru
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {NOTIFICATIONS.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          item.type === 'success'
                            ? 'bg-emerald-50 text-emerald-600'
                            : item.type === 'warning'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {item.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : item.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : (
                          <QrCode className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setDropdownOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-slate-100/90 border border-transparent hover:border-slate-200/80 transition-all cursor-pointer"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user?.avatar || 'SP'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight max-w-[140px] truncate">
                {user?.name || 'Pengguna SmartPresence'}
              </p>
              <p className="text-[10px] font-semibold text-blue-600 leading-tight">
                {user?.roleLabel || 'Administrator'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-68 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-20 animate-fade-in">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {user?.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border shrink-0 ${getRoleBadgeStyle(
                        user?.role
                      )}`}
                    >
                      {user?.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">ID:</span>
                    <span className="font-mono font-semibold text-slate-700">
                      {user?.identifier}
                    </span>
                  </div>
                </div>

                {/* Role Switcher pada Mobile */}
                <div className="px-4 py-2.5 border-b border-slate-100 sm:hidden">
                  <p className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Simulasi Ganti Role:
                  </p>
                  <div className="flex gap-1">
                    {['admin', 'pegawai', 'mahasiswa'].map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          switchDemoRole(r);
                          setDropdownOpen(false);
                        }}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold capitalize ${
                          user?.role === r
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-2 pt-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    Halaman Login / Daftar Akun
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar Sesi (Logout)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
