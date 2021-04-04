import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const login = (email, password) => auth.createUserWithEmailAndPassword(email, password);

  useEffect(() => auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  }), []);

  const value = {
    currentUser,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
