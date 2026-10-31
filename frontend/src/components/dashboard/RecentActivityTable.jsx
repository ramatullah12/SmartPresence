import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  QrCode,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { RECENT_ATTENDANCE_LOGS } from '../../data/dummyData';

const RecentActivityTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filteredLogs = RECENT_ATTENDANCE_LOGS.filter((log) => {
    const matchesSearch =
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Semua' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Hadir':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Hadir
          </span>
        );
      case 'Terlambat':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Terlambat
          </span>
        );
      case 'Tidak Hadir':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Tidak Hadir
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header & Filter Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Aktivitas Absensi Terbaru Hari Ini
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Log presensi real-time pegawai dan mahasiswa beserta validasi Geolocation & QR Code
          </p>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, NIP/NIM, unit..."
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel Data Rapi */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-5">Pengguna</th>
              <th className="py-3.5 px-4">Role & Unit</th>
              <th className="py-3.5 px-4">Waktu Check-In / Out</th>
              <th className="py-3.5 px-4">Metode & Geolocation</th>
              <th className="py-3.5 px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                          log.role === 'Pegawai'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {log.name
                          .split(' ')
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {log.name}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">
                          {log.identifier}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-md mb-1 ${
                        log.role === 'Pegawai'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-violet-50 text-violet-700'
                      }`}
                    >
                      {log.role}
                    </span>
                    <p className="text-xs text-slate-600 font-medium">
                      {log.unit}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-800 font-semibold">
                        In: {log.checkIn}
                      </span>
                      <span className="text-slate-400">Out: {log.checkOut}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        {log.method.includes('QR') ? (
                          <QrCode className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                        {log.method}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {log.distance}
                      </span>
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
                  className="py-10 text-center text-sm text-slate-400"
                >
                  Tidak ada data aktivitas absensi yang sesuai dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;
