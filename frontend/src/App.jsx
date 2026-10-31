import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Halaman Publik: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Halaman Terproteksi dengan Layout Sidebar & Navbar */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Route Modul Tahap Berikutnya (Agar navigasi Sidebar berfungsi penuh tanpa 404) */}
            <Route
              path="absensi"
              element={
                <PlaceholderPage
                  title="Sistem Absensi Check-In & Check-Out"
                  stageNumber="3"
                  description="Modul pencatatan kehadiran otomatis dengan status Hadir, Terlambat, Tidak Hadir, dan riwayat absensi lengkap."
                  features={[
                    'Check-In & Check-Out 1-Klik dengan pencatatan waktu real-time',
                    'Deteksi status otomatis (Hadir tepat waktu vs Terlambat)',
                    'Tabel riwayat absensi personal & keseluruhan',
                  ]}
                />
              }
            />
            <Route
              path="pegawai"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PlaceholderPage
                    title="Manajemen Data Pegawai"
                    stageNumber="2"
                    description="Kelola data pegawai/dosen mencakup tambah, edit, hapus, serta pencarian dan filter berdasarkan unit kerja."
                    features={[
                      'Tambah & Edit Pegawai (NIP, Nama, Jabatan, Unit Kerja, Email)',
                      'Hapus data dengan konfirmasi keamanan',
                      'Pencarian instan & filter berdasarkan departemen/status',
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="mahasiswa"
              element={
                <ProtectedRoute allowedRoles={['admin', 'pegawai']}>
                  <PlaceholderPage
                    title="Manajemen Data Mahasiswa"
                    stageNumber="2"
                    description="Kelola data mahasiswa mencakup NIM, nama lengkap, program studi, dan kelas."
                    features={[
                      'CRUD Data Mahasiswa (NIM, Nama, Program Studi, Kelas)',
                      'Filter berdasarkan Program Studi & Kelas',
                      'Pencarian cepat berdasarkan NIM atau Nama',
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="geolocation"
              element={
                <PlaceholderPage
                  title="Validasi Geolocation & Radius GPS"
                  stageNumber="3"
                  description="Integrasi Browser Geolocation API untuk mengambil koordinat GPS pengguna dan memvalidasi jarak terhadap titik pusat."
                  features={[
                    'Permintaan izin lokasi dari browser secara interaktif',
                    'Perhitungan jarak Haversine Formula (meter) dari titik pusat',
                    'Penolakan otomatis bila berada di luar radius yang ditentukan',
                  ]}
                />
              }
            />
            <Route
              path="qrcode"
              element={
                <PlaceholderPage
                  title="Generator & Scanner QR Code Dinamis"
                  stageNumber="4"
                  description="Pembuatan QR Code absensi dinamis dengan batas waktu (countdown timer) dan pemindaian untuk validasi backend."
                  features={[
                    'Generator QR Code dinamis dengan masa berlaku otomatis',
                    'Simulasi & pemindaian QR Code oleh Pegawai / Mahasiswa',
                    'Validasi token QR melalui endpoint API',
                  ]}
                />
              }
            />
            <Route
              path="laporan"
              element={
                <ProtectedRoute allowedRoles={['admin', 'pegawai']}>
                  <PlaceholderPage
                    title="Laporan Kehadiran & Export (Excel / PDF)"
                    stageNumber="4"
                    description="Rekapitulasi laporan harian, mingguan, dan bulanan disertai filter nama/tanggal dan fitur export."
                    features={[
                      'Laporan Harian, Mingguan, dan Bulanan',
                      'Filter multi-kriteria berdasarkan nama, role, dan rentang tanggal',
                      'Export data laporan ke format Excel (.xlsx/.csv) dan cetak PDF',
                    ]}
                  />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

