import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  LogOut,
  Clock,
  Calendar,
  UserCheck,
  ChevronDown,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onOpenSidebar }) => {
  const { user, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    weekday: 'long',
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
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Hamburger & Search / Page Context */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center max-w-xs w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari NIP, NIM, nama, atau log..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Center/Right: Live Date-Time, Quick Role Switcher (Demo), Notification, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Live Digital Clock */}
        <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            {formattedDate}
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1.5 font-mono text-slate-800 font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            {formattedTime} WIB
          </span>
        </div>

        {/* Simulasi Role Switcher Cepat untuk Pengujian */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
          {['admin', 'pegawai', 'mahasiswa'].map((r) => (
            <button
              key={r}
              onClick={() => switchDemoRole(r)}
              title={`Uji tampilan sebagai ${r.toUpperCase()}`}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                user?.role === r
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Tombol Notifikasi */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Notifikasi Absensi"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user?.avatar || 'SP'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {user?.name || 'Pengguna SmartPresence'}
              </p>
              <p className="text-[11px] text-slate-500 leading-tight">
                {user?.roleLabel || 'Administrator'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-20">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {user?.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getRoleBadgeStyle(
                        user?.role
                      )}`}
                    >
                      {user?.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {user?.identifier}
                  </p>
                </div>

                {/* Role Switcher pada Mobile */}
                <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                  <p className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5">
                    Ganti Role Demo:
                  </p>
                  <div className="flex gap-1">
                    {['admin', 'pegawai', 'mahasiswa'].map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          switchDemoRole(r);
                          setDropdownOpen(false);
                        }}
                        className={`flex-1 py-1 rounded-md text-xs font-medium capitalize ${
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

                <div className="px-2 pt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    Halaman Login / Ganti Akun
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar (Logout)
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
