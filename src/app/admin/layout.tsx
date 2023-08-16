"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import IconCategory from "@/components/atoms/icons/IconCategory";
import IconPosts from "@/components/atoms/icons/IconPosts";
import IconMedia from "@/components/atoms/icons/IconMedia";
import { AdminProvider } from "@/context/AdminProvider";
import { ApiConstant, PathConstant } from "@/constants";

const menus = [
  {
    id: 1,
    label: "Category",
    Icon: IconCategory,
    path: "/admin/category",
  },
  {
    id: 2,
    label: "Post",
    Icon: IconPosts,
    path: "/admin/posts",
  },
  {
    id: 3,
    label: "Media",
    Icon: IconMedia,
    path: "/admin/media",
  },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const checkActive = (path: string) => {
    return pathname.includes(path);
  };

  const handleLogout = () => {
    localStorage.removeItem(ApiConstant.ACCESS_TOKEN);
    router.push(PathConstant.ROUTE_LOGIN);
  };

  return (
    <AdminProvider>
      <div className="flex">
        <div className="h-screen shrink-0 border-r w-[240px] flex flex-col">
          <Link
            href="/admin"
            className="h-[64px] border-b flex items-center justify-center">
            Home
          </Link>
          <ul className="flex-1">
            {menus.map((menu) => (
              <li key={menu.id} className="px-4 group">
                <Link
                  title={menu.label}
                  href={menu.path}
                  className={`flex items-center px-4 py-3 mt-2 gap-2 rounded-xl text-sm font-semibold group-hover:bg-indigo-500 group-hover:text-white transition ${
                    checkActive(menu.path)
                      ? "bg-indigo-500 text-white font-bold cursor-default"
                      : "text-gray-600"
                  }`}>
                  <menu.Icon
                    width={28}
                    color={checkActive(menu.path) ? "#fff" : undefined}
                    className="group-hover:[&>*]:stroke-white group-hover:[&>*>*]:stroke-white"
                  />
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </AdminProvider>
  );
}

export default AdminLayout;
