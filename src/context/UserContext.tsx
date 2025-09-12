// contexts/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/services/auth";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔥 load user on first mount if cookies exist
  useEffect(() => {
    (async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch {
        setUser(null); // not logged in
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
