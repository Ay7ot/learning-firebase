import React, { ReactNode, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut, User, signInWithEmailAndPassword, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';
import { AuthContextType } from '../types/type';

const AuthContext = React.createContext<AuthContextType>({
    currentUser: null,
    signup: () => Promise.reject(new Error('signup not implemented')),
    login: () => Promise.reject(new Error('signin not implemented')),
    logout: () => Promise.reject(new Error('signin not implemented')),
    resetPassword: () => Promise.reject(new Error('password reset not implemented')),
    updateemail: () => Promise.reject(new Error('update email not implemented')),
    updatepassword: () => Promise.reject(new Error('update password not implemented')),
  });
  

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  
  async function login(email: string, password: string){
    return await signInWithEmailAndPassword(auth, email, password)
  }
  
  async function logout(){
    return signOut(auth)
  }
  
  function resetPassword(email: string){
    return sendPasswordResetEmail(auth, email)
  }

  function updateemail(email: string){
    if(currentUser){
        updateEmail(currentUser, email)
    }
  }
  
  function updatepassword(password: string){
    if(currentUser){
        updatePassword(currentUser, password)
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateemail,
    updatepassword
  };

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
