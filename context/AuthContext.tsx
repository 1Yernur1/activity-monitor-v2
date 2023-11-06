import { auth } from "@/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface User {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
