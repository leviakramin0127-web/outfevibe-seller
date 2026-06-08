'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import * as store from '../lib/store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = store.getCurrentSeller();
    if (current) setSeller(current);
    setLoading(false);
  }, []);

  const signUp = async (data) => {
    const result = store.signUp(data);
    if (result.data) setSeller(result.data);
    return result;
  };

  const signIn = async (email, password) => {
    const result = store.signIn(email, password);
    if (result.data) setSeller(result.data);
    return result;
  };

  const signOut = () => {
    store.signOut();
    setSeller(null);
  };

  const updateProfile = (updates) => {
    const result = store.updateSeller(updates);
    if (result.data) setSeller(result.data);
    return result;
  };

  return (
    <AuthContext.Provider value={{ seller, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
