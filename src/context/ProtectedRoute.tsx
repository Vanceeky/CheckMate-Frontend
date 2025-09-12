"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useUser();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // not logged in → login
    } else if (!allowedRoles.includes(user.role)) {
      router.replace("/not-found"); // logged in but wrong role
    } else {
      setChecked(true);
    }
  }, [user, allowedRoles, router]);

  if (!checked) return null; // wait until check completes

  return <>{children}</>;
}
