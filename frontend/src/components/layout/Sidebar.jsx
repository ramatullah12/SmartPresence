import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  MapPin,
  QrCode,
  FileBarChart2,
  ShieldCheck,
  X,
  Radio,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MENU_ITEMS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'pegawai', 'mahasiswa'],
    badge: null,
  },
  {
    name: 'Sistem Absensi',
    path: '/absensi',
    icon: ClipboardCheck,
    roles: ['admin', 'pegawai', 'mahasiswa'],
    badge: 'Live',
  },
  {
    name: 'Manajemen Pegawai',
    path: '/pegawai',
    icon: Users,
    roles: ['admin'],
    badge: null,
  },
  {
    name: 'Manajemen Mahasiswa',
    path: '/mahasiswa',
    icon: GraduationCap,
    roles: ['admin', 'pegawai'],
    badge: null,
  },
  {
    name: 'Geolocation & Radius',
    path: '/geolocation',
    icon: MapPin,
    roles: ['admin', 'pegawai', 'mahasiswa'],
    badge: 'GPS',
  },
  {
    name: 'QR Code Dinamis',
    path: '/qrcode',
    icon: QrCode,
    roles: ['admin', 'pegawai', 'mahasiswa'],
    badge: null,
  },
  {
    name: 'Laporan Kehadiran',
    path: '/laporan',
    icon: FileBarChart2,
    roles: ['admin', 'pegawai'],
    badge: null,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredMenu = MENU_ITEMS.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Backdrop gelap untuk tampilan mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-slate-900">
                    Smart<span className="text-blue-600">Presence</span>
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 leading-none">
                  Geo & QR Attendance SaaS
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Tutup Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Navigation */}
          <div className="px-4 py-5">
            <p className="px-3 mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Menu Utama ({user?.role?.toUpperCase() || 'USER'})
            </p>
            <nav className="space-y-1">
              {filteredMenu.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-blue-600'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Status Card: Geolocation Zone Status */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Zona Geolocation Aktif
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                Radius 150m
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium truncate">
              Kampus Utama & Gedung Rektorat
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
              -6.200000, 106.816666
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
