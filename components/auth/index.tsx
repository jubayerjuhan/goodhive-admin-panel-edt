"use client";

import { redirect } from "next/navigation";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  const isLoggedIn = window.localStorage.getItem("IsLoggedIn");

  if (isLoggedIn !== "true") {
    redirect("/login");
  }
  return <>{children}</>;
};
