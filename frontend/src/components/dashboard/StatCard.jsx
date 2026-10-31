import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const COLOR_VARIANTS = {
  blue: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-500/25',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    progressBg: 'bg-blue-600',
    glow: 'group-hover:border-blue-300/80',
  },
  indigo: {
    iconBg: 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    progressBg: 'bg-indigo-600',
    glow: 'group-hover:border-indigo-300/80',
  },
  emerald: {
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    progressBg: 'bg-emerald-500',
    glow: 'group-hover:border-emerald-300/80',
  },
  amber: {
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
    progressBg: 'bg-amber-500',
    glow: 'group-hover:border-amber-300/80',
  },
  rose: {
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/25',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
    progressBg: 'bg-rose-500',
    glow: 'group-hover:border-rose-300/80',
  },
};

const StatCard = ({
  title,
  value,
  subtitle,
  badge,
  icon: Icon,
  color = 'blue',
  progress = 78,
}) => {
  const theme = COLOR_VARIANTS[color] || COLOR_VARIANTS.blue;

  return (
    <div
      className={`group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden ${theme.glow}`}
    >
      {/* Subtle Background Glow Circle */}
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-slate-100/70 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${theme.iconBg}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Mini Progress Indicator */}
      <div className="relative z-10 mt-4">
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className={`h-full rounded-full transition-all duration-500 ${theme.progressBg}`}
          />
        </div>
      </div>

      <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-100/90 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 font-medium truncate">
          {subtitle}
        </span>
        {badge && (
          <span
            className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${theme.badgeBg}`}
          >
            <ArrowUpRight className="w-3 h-3" />
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
