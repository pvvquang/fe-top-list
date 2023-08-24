"use client";
import Button from "@/components/atoms/buttons";
import IconArrowDown from "@/components/atoms/icons/IconArrowDown";
import { PathConstant } from "@/constants";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

function PostDetailLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="px-4 py-6">
      <Button
        variant="text"
        color="info"
        onClick={() => router.push(PathConstant.ROUTE_ADMIN_POST)}>
        <span className="flex items-center gap-2">
          <IconArrowDown width={10} className="rotate-90" /> Back to List Post
        </span>
      </Button>
      {children}
    </div>
  );
}

export default PostDetailLayout;
