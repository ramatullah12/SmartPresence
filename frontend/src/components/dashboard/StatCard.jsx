import React from 'react';

const COLOR_VARIANTS = {
  blue: {
    iconBg: 'bg-blue-50 text-blue-600 ring-1 ring-blue-100',
    badgeBg: 'bg-blue-50 text-blue-700',
    accentBar: 'from-blue-600 to-indigo-600',
  },
  indigo: {
    iconBg: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100',
    badgeBg: 'bg-indigo-50 text-indigo-700',
    accentBar: 'from-indigo-600 to-violet-600',
  },
  emerald: {
    iconBg: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
    badgeBg: 'bg-emerald-50 text-emerald-700',
    accentBar: 'from-emerald-500 to-teal-600',
  },
  amber: {
    iconBg: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100',
    badgeBg: 'bg-amber-50 text-amber-700',
    accentBar: 'from-amber-500 to-orange-500',
  },
  rose: {
    iconBg: 'bg-rose-50 text-rose-600 ring-1 ring-rose-100',
    badgeBg: 'bg-rose-50 text-rose-700',
    accentBar: 'from-rose-500 to-red-600',
  },
};

const StatCard = ({ title, value, subtitle, badge, icon: Icon, color = 'blue' }) => {
  const theme = COLOR_VARIANTS[color] || COLOR_VARIANTS.blue;

  return (
    <div className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Top Gradient Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accentBar} opacity-85`}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5 tracking-tight">
            {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${theme.iconBg}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 font-medium truncate">{subtitle}</span>
        {badge && (
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${theme.badgeBg}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
