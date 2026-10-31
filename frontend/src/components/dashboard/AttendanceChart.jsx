import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, CheckCircle2, Clock, XCircle } from 'lucide-react';
import {
  WEEKLY_ATTENDANCE_STATS,
  MONTHLY_ATTENDANCE_STATS,
} from '../../data/dummyData';

const AttendanceChart = () => {
  const [period, setPeriod] = useState('mingguan');

  const data =
    period === 'mingguan' ? WEEKLY_ATTENDANCE_STATS : MONTHLY_ATTENDANCE_STATS;

  const maxVal = Math.max(
    ...data.map((d) => d.hadir),
    100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header Grafik */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Analitik & Tren Kehadiran
              </h2>
              <p className="text-xs text-slate-500">
                Visualisasi perbandingan Hadir, Terlambat, dan Tidak Hadir ({period})
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Periode */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          <button
            onClick={() => setPeriod('mingguan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'mingguan'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Mingguan
          </button>
          <button
            onClick={() => setPeriod('bulanan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'bulanan'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Bulanan (%)
          </button>
        </div>
      </div>

      {/* Konten Utama Grafik: Kiri Bar Chart, Kanan Donut Distribusi */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-5 items-center flex-1">
        {/* Kolom Kiri (2/3): Bar Chart Interaktif */}
        <div className="xl:col-span-2 flex flex-col justify-between">
          {/* Legend & Trend Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-700 to-blue-500 inline-block" />
                Hadir Tepat Waktu
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-amber-500 to-amber-400 inline-block" />
                Terlambat
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-rose-600 to-rose-400 inline-block" />
                Tidak Hadir
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3.8% vs Minggu Lalu</span>
            </div>
          </div>

          {/* Plot Area */}
          <div className="pt-4">
            <div
              className={`grid ${
                data.length === 6 ? 'grid-cols-6' : 'grid-cols-4'
              } gap-2 sm:gap-4 items-end h-52 pt-6 px-2 border-b border-slate-200/90 relative`}
            >
              {/* Horizontal Grid Lines */}
              <div className="absolute inset-x-0 top-4 border-t border-dashed border-slate-100 pointer-events-none flex justify-end">
                <span className="text-[10px] font-mono text-slate-300 -mt-3.5">Max</span>
              </div>
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-100 pointer-events-none" />

              {data.map((item) => {
                const hadirHeight = Math.max(
                  Math.round((item.hadir / maxVal) * 155),
                  14
                );
                const terlambatHeight = Math.max(
                  Math.round((item.terlambat / maxVal) * 155),
                  10
                );
                const tidakHadirHeight = Math.max(
                  Math.round((item.tidakHadir / maxVal) * 155),
                  8
                );

                return (
                  <div
                    key={item.day}
                    className="flex flex-col items-center group relative z-10 h-full justify-end"
                  >
                    {/* Floating Glass Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 absolute -top-18 bg-slate-900/95 backdrop-blur-md text-white text-[11px] rounded-xl px-3 py-2 shadow-xl pointer-events-none whitespace-nowrap z-20 border border-white/10">
                      <p className="font-bold text-blue-300 mb-1 border-b border-white/10 pb-0.5">
                        {item.day}
                      </p>
                      <div className="space-y-0.5 font-mono text-[10px]">
                        <p className="text-emerald-300">● Hadir: {item.hadir}</p>
                        <p className="text-amber-300">● Terlambat: {item.terlambat}</p>
                        <p className="text-rose-300">● Absen: {item.tidakHadir}</p>
                      </div>
                    </div>

                    {/* Bar Trio */}
                    <div className="flex items-end gap-1 sm:gap-1.5 w-full justify-center">
                      <div
                        style={{ height: `${hadirHeight}px` }}
                        className="w-3 sm:w-5 bg-gradient-to-t from-blue-700 to-blue-500 group-hover:from-blue-600 group-hover:to-blue-400 rounded-t-md shadow-xs transition-all duration-300"
                      />
                      <div
                        style={{ height: `${terlambatHeight}px` }}
                        className="w-2.5 sm:w-3.5 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-md transition-all duration-300"
                      />
                      <div
                        style={{ height: `${tidakHadirHeight}px` }}
                        className="w-2.5 sm:w-3.5 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-md transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-Axis Labels */}
            <div
              className={`grid ${
                data.length === 6 ? 'grid-cols-6' : 'grid-cols-4'
              } gap-2 sm:gap-4 pt-3 text-center`}
            >
              {data.map((item) => (
                <div key={item.day}>
                  <p className="text-xs font-bold text-slate-700">{item.day}</p>
                  <p className="text-[11px] font-mono text-slate-400">
                    {item.hadir}
                    {period === 'bulanan' ? '%' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan (1/3): Ringkasan Proporsi Kehadiran (Donut Visual) */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-blue-600" />
              Distribusi Hari Ini
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-400">
              Total: 1.388
            </span>
          </div>

          {/* SVG Donut Chart */}
          <div className="relative w-32 h-32 mx-auto my-2 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <path
                className="text-slate-200"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Hadir Segment (85.4%) */}
              <path
                className="text-blue-600"
                strokeDasharray="85.4, 100"
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Terlambat Segment */}
              <path
                className="text-amber-500"
                strokeDasharray="8.1, 100"
                strokeDashoffset="-85.4"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-slate-900">85.4%</span>
              <span className="text-[10px] font-semibold text-emerald-600">
                Tepat Waktu
              </span>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2 mt-3 pt-3 border-t border-slate-200/70 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Hadir (1.186)
              </span>
              <span className="font-mono font-bold text-slate-800">85.4%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Terlambat (112)
              </span>
              <span className="font-mono font-bold text-slate-800">8.1%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                Tidak Hadir (90)
              </span>
              <span className="font-mono font-bold text-slate-800">6.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
