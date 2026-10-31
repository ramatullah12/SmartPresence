import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/dummyData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('smartpresence_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('smartpresence_user');
      }
    } else {
      const defaultAdmin = DEMO_USERS[0];
      setUser(defaultAdmin);
      localStorage.setItem('smartpresence_user', JSON.stringify(defaultAdmin));
      localStorage.setItem('smartpresence_token', 'demo-sanctum-token-admin');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const registeredCustomUsers = JSON.parse(
      localStorage.getItem('smartpresence_custom_users') || '[]'
    );
    const allUsers = [...DEMO_USERS, ...registeredCustomUsers];

    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      throw new Error(
        'Email atau kata sandi tidak valid. Silakan klik salah satu kartu Akun Demo di atas atau daftar akun baru.'
      );
    }

    const { password: _, ...safeUser } = foundUser;
    setUser(safeUser);
    localStorage.setItem('smartpresence_user', JSON.stringify(safeUser));
    localStorage.setItem('smartpresence_token', `demo-sanctum-token-${safeUser.role}`);
    return safeUser;
  };

  const register = async ({ name, email, password, role, identifier, department }) => {
    const roleLabels = {
      admin: 'Administrator Sistem',
      pegawai: 'Pegawai / Dosen',
      mahasiswa: 'Mahasiswa',
    };

    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      roleLabel: roleLabels[role] || 'Pengguna',
      identifier: identifier || (role === 'mahasiswa' ? 'NIM. 2410511099' : 'NIP. 199501012024011001'),
      department: department || (role === 'mahasiswa' ? 'S1 Teknik Informatika' : 'Fakultas Ilmu Komputer'),
      avatar: initials || 'SP',
    };

    const existing = JSON.parse(localStorage.getItem('smartpresence_custom_users') || '[]');
    existing.push(newUser);
    localStorage.setItem('smartpresence_custom_users', JSON.stringify(existing));

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('smartpresence_user', JSON.stringify(safeUser));
    localStorage.setItem('smartpresence_token', `demo-sanctum-token-${safeUser.role}`);
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartpresence_user');
    localStorage.removeItem('smartpresence_token');
  };

  const switchDemoRole = (role) => {
    const targetUser = DEMO_USERS.find((u) => u.role === role);
    if (targetUser) {
      const { password: _, ...safeUser } = targetUser;
      setUser(safeUser);
      localStorage.setItem('smartpresence_user', JSON.stringify(safeUser));
      localStorage.setItem('smartpresence_token', `demo-sanctum-token-${safeUser.role}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};
