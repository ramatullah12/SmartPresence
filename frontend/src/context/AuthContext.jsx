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
      // Default ke akun Admin pada saat pertama kali dibuka agar user bisa langsung mengeksplorasi,
      // namun tetap bisa Logout ke halaman Login kapan saja.
      const defaultAdmin = DEMO_USERS[0];
      setUser(defaultAdmin);
      localStorage.setItem('smartpresence_user', JSON.stringify(defaultAdmin));
      localStorage.setItem('smartpresence_token', 'demo-sanctum-token-admin');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulasi autentikasi (akan dihubungkan ke endpoint Laravel Sanctum /api/login pada tahap Backend)
    const foundUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      throw new Error('Email atau kata sandi tidak valid. Silakan gunakan akun demo yang tersedia.');
    }

    const { password: _, ...safeUser } = foundUser;
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
    <AuthContext.Provider value={{ user, loading, login, logout, switchDemoRole }}>
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
