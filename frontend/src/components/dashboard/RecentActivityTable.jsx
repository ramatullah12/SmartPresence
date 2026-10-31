import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  QrCode,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  Users,
} from 'lucide-react';
import { RECENT_ATTENDANCE_LOGS } from '../../data/dummyData';

const STATUS_TABS = ['Semua', 'Hadir', 'Terlambat', 'Tidak Hadir'];

const RecentActivityTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [roleFilter, setRoleFilter] = useState('Semua');

  const filteredLogs = RECENT_ATTENDANCE_LOGS.filter((log) => {
    const matchesSearch =
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Semua' || log.status === statusFilter;

    const matchesRole = roleFilter === 'Semua' || log.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Hadir':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Hadir
          </span>
        );
      case 'Terlambat':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Terlambat
          </span>
        );
      case 'Tidak Hadir':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Tidak Hadir
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
      {/* Header & Interactive Filter Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Aktivitas Absensi Terbaru
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                Live Feed
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Log presensi real-time pegawai & mahasiswa beserta koordinat Geolocation GPS dan metode QR Code
            </p>
          </div>
        </div>

        {/* Filter Bar: Status Pills + Role Select + Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter Pills */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Role</option>
              <option value="Pegawai">Pegawai</option>
              <option value="Mahasiswa">Mahasiswa</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, NIP/NIM..."
              className="w-full sm:w-52 pl-8 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tabel Data Modern */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-5">Personel (Pegawai / Mahasiswa)</th>
              <th className="py-3.5 px-4">Role & Unit / Kelas</th>
              <th className="py-3.5 px-4">Waktu Presensi</th>
              <th className="py-3.5 px-4">Validasi Geolocation & QR</th>
              <th className="py-3.5 px-5 text-right">Status Kehadiran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="group hover:bg-blue-50/35 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                          log.role === 'Pegawai'
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                            : 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                        }`}
                      >
                        {log.name
                          .split(' ')
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors">
                          {log.name}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          {log.identifier} • <span className="text-slate-300">{log.id}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-md mb-1 border ${
                        log.role === 'Pegawai'
                          ? 'bg-blue-50 text-blue-700 border-blue-200/70'
                          : 'bg-violet-50 text-violet-700 border-violet-200/70'
                      }`}
                    >
                      {log.role}
                    </span>
                    <p className="text-xs text-slate-600 font-semibold">
                      {log.unit}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div className="inline-flex flex-col gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/60">
                      <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        In: {log.checkIn}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        Out: {log.checkOut}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        {log.method.includes('QR') ? (
                          <QrCode className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                        {log.method}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          {log.distance}
                        </span>
                        {log.coordinates !== '-' && (
                          <span className="font-mono text-[10px] text-slate-400 hidden xl:inline">
                            ({log.coordinates})
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    {renderStatusBadge(log.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-sm text-slate-400"
                >
                  Tidak ada data aktivitas absensi yang sesuai dengan filter pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          Menampilkan <strong className="text-slate-800">{filteredLogs.length}</strong> dari{' '}
          <strong className="text-slate-800">{RECENT_ATTENDANCE_LOGS.length}</strong> log presensi terbaru
        </span>
        <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
          Sinkronisasi Otomatis Geolocation & Sanctum API
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export default RecentActivityTable;
