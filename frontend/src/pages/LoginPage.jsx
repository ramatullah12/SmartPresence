import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  QrCode,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/dummyData';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@smartpresence.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Gagal melakukan autentikasi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Panel Kiri: Branding & Informasi Fitur SaaS */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Dekorasi Latar */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">
              Smart<span className="text-blue-300">Presence</span>
            </span>
            <p className="text-xs text-blue-200/80">
              Enterprise Digital Attendance & Geolocation System
            </p>
          </div>
        </div>

        {/* Hero Copywriting & Feature Highlights */}
        <div className="relative z-10 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Terintegrasi Geolocation GPS & Dynamic QR Code</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
            Sistem Presensi Digital Akurat untuk Pegawai & Mahasiswa.
          </h1>
          <p className="text-sm text-blue-100/85 mt-4 leading-relaxed">
            Pantau kehadiran secara real-time dengan validasi koordinat radius GPS otomatis,
            pemindaian QR Code dinamis berbatas waktu, dan analitik pelaporan terpadu.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <MapPin className="w-5 h-5 text-blue-300 mb-2" />
              <h3 className="text-sm font-semibold">Geofencing Presisi</h3>
              <p className="text-xs text-blue-100/75 mt-1">
                Validasi radius kehadiran otomatis menggunakan koordinat GPS browser.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <QrCode className="w-5 h-5 text-blue-300 mb-2" />
              <h3 className="text-sm font-semibold">QR Code Dinamis</h3>
              <p className="text-xs text-blue-100/75 mt-1">
                Token QR terenkripsi dengan masa berlaku dinamis mencegah titip absen.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Kiri */}
        <div className="relative z-10 flex items-center justify-between text-xs text-blue-200/70 border-t border-white/10 pt-6">
          <span>© 2026 SmartPresence SaaS Platform</span>
          <span>React + Vite • Tailwind CSS • Laravel Sanctum</span>
        </div>
      </div>

      {/* Panel Kanan: Form Login */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-7 sm:p-9">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">
                Smart<span className="text-blue-600">Presence</span>
              </h2>
              <p className="text-xs text-slate-500">
                Sistem Absensi Digital & Geolocation
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Masuk ke akun Anda sesuai role (Admin, Pegawai, atau Mahasiswa)
            </p>
          </div>

          {/* Pilihan Cepat Akun Demo (1-Klik) */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Pilih Cepat Akun Demo (Klik untuk Isi Otomatis):
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_USERS.map((u) => {
                const isSelected = email.toLowerCase() === u.email.toLowerCase();
                return (
                  <button
                    key={u.role}
                    type="button"
                    onClick={() => handleFillDemo(u)}
                    className={`flex flex-col items-center py-2 px-2 rounded-xl border text-xs font-semibold capitalize transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span>{u.role}</span>
                    <span
                      className={`text-[10px] font-normal truncate max-w-full ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {u.email.split('@')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pesan Error */}
          {errorMsg && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email Institusi
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@smartpresence.id"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <span className="text-[11px] font-medium text-blue-600">
                  Default: password123
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Tampilkan Kata Sandi"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Ingat sesi perangkat ini</span>
              </label>
              <span className="text-slate-400">Sanctum Auth Ready</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Koneksi terenkripsi & siap dihubungkan ke API Laravel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
