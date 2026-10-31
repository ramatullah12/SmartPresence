import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';

const PlaceholderPage = ({ title, stageNumber, description, features = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 max-w-3xl mx-auto my-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto mb-4">
        <Layers className="w-7 h-7" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Disiapkan untuk Tahap Pengembangan #{stageNumber}</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
        {description}
      </p>

      {features.length > 0 && (
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-left max-w-lg mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Fitur yang Akan Dibangun pada Modul Ini:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard Utama</span>
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;

