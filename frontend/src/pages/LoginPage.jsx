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
  UserPlus,
  LogIn,
  User,
  Building2,
  BadgeCheck,
  Radio,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/dummyData';

const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('admin@smartpresence.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // State form registrasi
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('mahasiswa');
  const [regIdentifier, setRegIdentifier] = useState('');
  const [regDepartment, setRegDepartment] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e) => {
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        identifier: regIdentifier,
        department: regDepartment,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mendaftarkan pengguna.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (demoUser) => {
    setMode('login');
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      {/* Panel Kiri: Interactive SaaS Showcase & Radar Geofencing Visual */}
      <div className="hidden lg:flex lg:w-[52%] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Mesh Gradients & Grid Overlay */}
        <div className="absolute -top-28 -left-28 w-[420px] h-[420px] rounded-full bg-blue-600/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-600/30 ring-2 ring-white/15">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">
                Smart<span className="text-blue-400">Presence</span>
              </span>
              <p className="text-[11px] text-blue-200/75 font-medium">
                Enterprise Digital Attendance & Geolocation SaaS
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            GPS & QR Server Online
          </span>
        </div>

        {/* Center Hero & Live Interactive Geofence Mockup */}
        <div className="relative z-10 my-auto py-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presensi Modern Berbasis Geolocation & Dynamic QR</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight">
            Validasi Kehadiran Pegawai & Mahasiswa Secara{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Real-Time & Presisi.
            </span>
          </h1>
          <p className="text-sm text-blue-100/80 mt-3.5 leading-relaxed">
            Dilengkapi proteksi radius koordinat GPS otomatis (Geofencing), token QR Code
            dinamis berbatas waktu, dan analitik pelaporan terpadu untuk Admin, Pegawai,
            serta Mahasiswa.
          </p>

          {/* Visual Radar & QR Glass Card */}
          <div className="mt-7 p-5 rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="grid grid-cols-12 gap-5 items-center">
              {/* Visual Radar Geofence */}
              <div className="col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 border border-white/10 relative overflow-hidden">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/30 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-blue-400/40" />
                  <div className="absolute inset-8 rounded-full bg-blue-500/20 border border-blue-400/50" />
                  {/* Titik Pusat */}
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-400 ring-4 ring-blue-500/30 z-10" />
                  {/* Pin Pengguna di dalam radius */}
                  <div className="absolute top-5 right-6 flex items-center gap-1 bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md">
                    <span>24m</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-blue-300 mt-1">
                  Radius Validasi ≤ 150m
                </span>
              </div>

              {/* Live Metrics & Features */}
              <div className="col-span-7 space-y-3">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Browser Geolocation API
                    </h4>
                    <p className="text-[11px] text-blue-100/70 mt-0.5">
                      Menolak otomatis absensi di luar radius koordinat kampus/kantor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Dynamic QR Code Token
                    </h4>
                    <p className="text-[11px] text-blue-100/70 mt-0.5">
                      QR Code berganti berkala dengan validasi backend Laravel Sanctum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Kiri */}
        <div className="relative z-10 flex items-center justify-between text-xs text-blue-200/60 border-t border-white/10 pt-5">
          <span>© 2026 SmartPresence Enterprise</span>
          <span className="font-mono text-[11px]">
            React 18 • Tailwind CSS • Laravel Sanctum API
          </span>
        </div>
      </div>

      {/* Panel Kanan: Form Login & Register Modern */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 lg:p-12">
        <div className="w-full max-w-[460px] bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-8 animate-fade-in">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-slate-900 leading-none">
                  Smart<span className="text-blue-600">Presence</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Digital Attendance & Geolocation
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
              v2.4 SaaS
            </span>
          </div>

          {/* Segmented Tab Switcher: Masuk vs Daftar */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl border border-slate-200/70 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Akun</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Pengguna</span>
            </button>
          </div>

          {mode === 'login' ? (
            <>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Selamat Datang Kembali
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pilih akun demo 1-klik di bawah atau masukkan kredensial Anda.
                </p>
              </div>

              {/* Pilihan Cepat Akun Demo (3 Role) */}
              <div className="mt-5 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Akun Demo Instan (Klik Role):
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600">
                    Auto-Fill
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {DEMO_USERS.map((u) => {
                    const isSelected =
                      email.toLowerCase() === u.email.toLowerCase();
                    return (
                      <button
                        key={u.role}
                        type="button"
                        onClick={() => handleFillDemo(u)}
                        className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-[1.02]'
                            : 'bg-white text-slate-700 border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/30'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg text-[11px] font-extrabold flex items-center justify-center mb-1 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.avatar}
                        </div>
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

              {/* Form Login */}
              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    <label className="block text-xs font-bold text-slate-700">
                      Kata Sandi
                    </label>
                    <span className="text-[11px] font-mono font-medium text-blue-600">
                      Pass: password123
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                >
                  <span>
                    {isSubmitting ? 'Memverifikasi Sesi...' : 'Masuk ke Dashboard'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            /* Form Register Pengguna Baru */
            <>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Registrasi Pengguna Baru
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Buat akun baru untuk Role Admin, Pegawai, atau Mahasiswa.
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pilih Role Pengguna
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['mahasiswa', 'pegawai', 'admin'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRegRole(r)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                          regRole === r
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Contoh: Rizky Pratama, S.Kom"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {regRole === 'mahasiswa' ? 'Nomor Induk (NIM)' : 'Nomor Induk (NIP)'}
                    </label>
                    <div className="relative">
                      <BadgeCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regIdentifier}
                        onChange={(e) => setRegIdentifier(e.target.value)}
                        placeholder={
                          regRole === 'mahasiswa' ? 'NIM. 2410511012' : 'NIP. 19910203...'
                        }
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {regRole === 'mahasiswa' ? 'Prodi & Kelas' : 'Unit Kerja'}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regDepartment}
                        onChange={(e) => setRegDepartment(e.target.value)}
                        placeholder={
                          regRole === 'mahasiswa'
                            ? 'Informatika - TI-3A'
                            : 'Fakultas Ilmu Komputer'
                        }
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Institusi
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="rizky@smartpresence.id"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Daftarkan & Masuk Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Proteksi Role & Sesi Token Sanctum Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
