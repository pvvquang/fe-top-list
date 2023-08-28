"use client";
import { IPost } from "@/types/post.type";
import React, { createContext, useContext, useState } from "react";

interface AdminPostContextValue {
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const AdminPostContext = createContext<AdminPostContextValue | null>(null);

export const useAdminPostContent = () => {
  const value = useContext(AdminPostContext);
  if (value === null)
    throw Error("This context has not been Admin Post Provider");
  return value;
};

export const AdminPostProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const value = { posts, setPosts };
  return (
    <AdminPostContext.Provider value={value}>
      {children}
    </AdminPostContext.Provider>
  );
};
