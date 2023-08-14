"use client";
import { User } from "@/types/auth.type";
import React, { createContext, useContext, useState } from "react";

interface AdminContextValue {
  userInfo: User | null;
}

const AdminContext = createContext<AdminContextValue | null>(null);

const useAdminContent = () => {
  const value = useContext(AdminContext);
  if (value === null) throw Error("Admin context has not been Provider");
  return value;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const value = { userInfo };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
