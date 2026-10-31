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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MENU_GROUPS = [
  {
    groupLabel: 'Utama & Presensi',
    items: [
      {
        name: 'Dashboard Analitik',
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
        badgeType: 'emerald',
      },
      {
        name: 'Geolocation & Radius',
        path: '/geolocation',
        icon: MapPin,
        roles: ['admin', 'pegawai', 'mahasiswa'],
        badge: 'GPS',
        badgeType: 'blue',
      },
      {
        name: 'QR Code Dinamis',
        path: '/qrcode',
        icon: QrCode,
        roles: ['admin', 'pegawai', 'mahasiswa'],
        badge: 'Token',
        badgeType: 'indigo',
      },
    ],
  },
  {
    groupLabel: 'Manajemen Master',
    items: [
      {
        name: 'Manajemen Pegawai',
        path: '/pegawai',
        icon: Users,
        roles: ['admin'],
        badge: '148',
        badgeType: 'slate',
      },
      {
        name: 'Manajemen Mahasiswa',
        path: '/mahasiswa',
        icon: GraduationCap,
        roles: ['admin', 'pegawai'],
        badge: '1.2k',
        badgeType: 'slate',
      },
    ],
  },
  {
    groupLabel: 'Rekapitulasi',
    items: [
      {
        name: 'Laporan Kehadiran',
        path: '/laporan',
        icon: FileBarChart2,
        roles: ['admin', 'pegawai'],
        badge: 'PDF/XLS',
        badgeType: 'amber',
      },
    ],
  },
];

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getBadgeStyle = (type, isActive) => {
    if (isActive) return 'bg-white/20 text-white border border-white/25';
    switch (type) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200/80';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border border-amber-200/80';
      case 'slate':
        return 'bg-slate-100 text-slate-600 border border-slate-200/80';
      default:
        return 'bg-blue-50 text-blue-700 border border-blue-200/80';
    }
  };

  return (
    <>
      {/* Backdrop gelap untuk tampilan mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:z-30 select-none ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : 'w-72'}`}
      >
        {/* Top Brand Header */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-600/25 shrink-0 ring-2 ring-blue-50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <div className="transition-opacity duration-200">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-[17px] tracking-tight text-slate-900">
                      Smart<span className="text-blue-600">Presence</span>
                    </span>
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200/60">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 leading-none mt-0.5">
                    Geo & QR Attendance SaaS
                  </p>
                </div>
              )}
            </div>

            {/* Tombol Tutup di Mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Tutup Sidebar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tombol Collapse di Desktop */}
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Perluas Sidebar' : 'Kecilkan Sidebar'}
              className="hidden lg:flex w-7 h-7 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-500 hover:text-blue-600 items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Menu Navigation Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
            {MENU_GROUPS.map((group) => {
              const visibleItems = group.items.filter(
                (item) => !user?.role || item.roles.includes(user.role)
              );
              if (visibleItems.length === 0) return null;

              return (
                <div key={group.groupLabel}>
                  {!isCollapsed && (
                    <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400/90">
                      {group.groupLabel}
                    </p>
                  )}
                  <nav className="space-y-1">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        location.pathname === item.path ||
                        (item.path !== '/dashboard' &&
                          location.pathname.startsWith(item.path));

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          title={isCollapsed ? item.name : undefined}
                          onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                          }}
                          className={`group relative flex items-center ${
                            isCollapsed ? 'justify-center px-2' : 'justify-between px-3.5'
                          } py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25'
                              : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-[18px] h-[18px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                                isActive
                                  ? 'text-white'
                                  : 'text-slate-400 group-hover:text-blue-600'
                              }`}
                            />
                            {!isCollapsed && <span>{item.name}</span>}
                          </div>

                          {!isCollapsed && item.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${getBadgeStyle(
                                item.badgeType,
                                isActive
                              )}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status Card: Geolocation Zone Status */}
        <div className="p-3.5 border-t border-slate-100 shrink-0">
          {isCollapsed ? (
            <div
              title="Zona Geolocation Aktif (Radius 150m)"
              className="w-11 h-11 mx-auto rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-sm"
            >
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-md relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/15 blur-xl pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-blue-300 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  Geofencing Aktif
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  ≤ 150m
                </span>
              </div>
              <p className="text-xs text-white font-semibold truncate">
                Kampus Utama & Rektorat
              </p>
              <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/10 text-[10px] text-slate-400 font-mono">
                <span>-6.2000, 106.8166</span>
                <span className="text-blue-300 flex items-center gap-0.5 font-sans font-semibold">
                  <Sparkles className="w-3 h-3" /> GPS Ready
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
