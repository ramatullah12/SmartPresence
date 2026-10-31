import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  WEEKLY_ATTENDANCE_STATS,
  MONTHLY_ATTENDANCE_STATS,
} from '../../data/dummyData';

const AttendanceChart = () => {
  const [period, setPeriod] = useState('mingguan');

  const data =
    period === 'mingguan' ? WEEKLY_ATTENDANCE_STATS : MONTHLY_ATTENDANCE_STATS;

  // Hitung nilai maksimum untuk skala tinggi grafik batang
  const maxVal = Math.max(
    ...data.map((d) => d.hadir + d.terlambat + d.tidakHadir),
    100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header Grafik */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Grafik Statistik Kehadiran
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Perbandingan jumlah Hadir, Terlambat, dan Tidak Hadir ({period})
          </p>
        </div>

        {/* Toggle Periode */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setPeriod('mingguan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              period === 'mingguan'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mingguan
          </button>
          <button
            onClick={() => setPeriod('bulanan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              period === 'bulanan'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bulanan (%)
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block" />
            Hadir Tepat Waktu
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
            Terlambat
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block" />
            Tidak Hadir
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Rata-rata Kehadiran: 88.4%</span>
        </div>
      </div>

      {/* Visualisasi Bar Chart Interaktif */}
      <div className="pt-4 pb-2">
        <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-56 pt-6 px-2 border-b border-slate-200 relative">
          {/* Garis bantu horizontal */}
          <div className="absolute inset-x-0 top-6 border-t border-dashed border-slate-100 pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-100 pointer-events-none" />

          {data.map((item) => {
            const hadirHeight = Math.max(Math.round((item.hadir / maxVal) * 160), 10);
            const terlambatHeight = Math.max(
              Math.round((item.terlambat / maxVal) * 160),
              6
            );
            const tidakHadirHeight = Math.max(
              Math.round((item.tidakHadir / maxVal) * 160),
              6
            );

            return (
              <div
                key={item.day}
                className="flex flex-col items-center group relative z-10"
              >
                {/* Tooltip saat hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-16 bg-slate-900 text-white text-[10px] rounded-lg px-2.5 py-1.5 shadow-lg pointer-events-none whitespace-nowrap z-20">
                  <p className="font-bold text-blue-300 mb-0.5">{item.day}</p>
                  <p>Hadir: {item.hadir}</p>
                  <p>Terlambat: {item.terlambat}</p>
                  <p>Absen: {item.tidakHadir}</p>
                </div>

                {/* Grouped Bars */}
                <div className="flex items-end gap-1 sm:gap-1.5 w-full justify-center">
                  <div
                    style={{ height: `${hadirHeight}px` }}
                    className="w-3 sm:w-5 bg-blue-600 hover:bg-blue-500 rounded-t-md transition-all duration-300"
                    title={`Hadir: ${item.hadir}`}
                  />
                  <div
                    style={{ height: `${terlambatHeight}px` }}
                    className="w-2.5 sm:w-4 bg-amber-500 hover:bg-amber-400 rounded-t-md transition-all duration-300"
                    title={`Terlambat: ${item.terlambat}`}
                  />
                  <div
                    style={{ height: `${tidakHadirHeight}px` }}
                    className="w-2.5 sm:w-4 bg-rose-500 hover:bg-rose-400 rounded-t-md transition-all duration-300"
                    title={`Tidak Hadir: ${item.tidakHadir}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Label Sumbu X */}
        <div
          className={`grid ${
            data.length === 6 ? 'grid-cols-6' : 'grid-cols-4'
          } gap-2 sm:gap-4 pt-3 text-center`}
        >
          {data.map((item) => (
            <div key={item.day}>
              <p className="text-xs font-semibold text-slate-700">{item.day}</p>
              <p className="text-[11px] text-slate-400">
                {item.hadir} {period === 'bulanan' ? '%' : 'org'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
