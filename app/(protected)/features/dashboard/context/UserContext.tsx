"use client";

import { createContext, useContext } from "react";

interface UserContextType {
  username: string;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
