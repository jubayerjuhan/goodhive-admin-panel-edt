import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import { AuthLayout } from "@/components/auth";

export const metadata: Metadata = {
  title: "Goodhive | Admin",
  description: "This is admin dashboard page",
};

export default function Home() {
  return (
    <AuthLayout>
      <ECommerce />
    </AuthLayout>
  );
}
