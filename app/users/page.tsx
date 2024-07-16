import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UsersTable from "@/components/Tables/UsersTable";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users | Goodhive",
};

const UsersPage = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <UsersTable />
      </div>
    </>
  );
};

export default UsersPage;
