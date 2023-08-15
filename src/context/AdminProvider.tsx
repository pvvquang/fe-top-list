"use client";
import { getUserInfo } from "@/services/auth.service";
import { HttpCode } from "@/types/api.type";
import { User } from "@/types/auth.type";
import React, { createContext, useContext, useEffect, useState } from "react";

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

  const fetchUserInfo = async () => {
    try {
      const user = await getUserInfo();
      if (user) setUserInfo(user);
    } catch (err: any) {
      if (err.response.status === HttpCode.UNAUTHORIZED) {
        // handle refresh token
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const value = { userInfo };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
