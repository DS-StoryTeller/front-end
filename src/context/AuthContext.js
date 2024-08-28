import React, { createContext, useContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); // 프로필 선택 상태

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setSelectedProfile(null); // 로그아웃 시 프로필 선택 해제
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, selectedProfile, setSelectedProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
