import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import JobsTable from "@/components/Tables/CompaniesTable";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Companies | Goodhive",
};

const JobsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Companies" />

      <div className="flex flex-col gap-10">
        <JobsTable />
      </div>
    </>
  );
};

export default JobsPage;
