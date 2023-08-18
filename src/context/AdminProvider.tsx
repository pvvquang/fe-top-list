"use client";
import ConditionalRender from "@/components/atoms/ConditionalRender";
import Loading from "@/components/atoms/Loading";
import { getUserInfo } from "@/services/auth.service";
import { HttpCode } from "@/types/api.type";
import { User } from "@/types/auth.type";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AdminContextValue {
  userInfo: User | null;
  fetchWithLoading: (callback: () => Promise<void>) => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export const useAdminContent = () => {
  const value = useContext(AdminContext);
  if (value === null) throw Error("Admin context has not been Provider");
  return value;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
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

  const fetchWithLoading = async (callback: () => Promise<void>) => {
    setPageLoading(true);
    callback().finally(() => {
      setPageLoading(false);
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const value = { userInfo, fetchWithLoading };
  return (
    <AdminContext.Provider value={value}>
      <ConditionalRender conditional={pageLoading} fallback={children}>
        <Loading />
      </ConditionalRender>
    </AdminContext.Provider>
  );
};
