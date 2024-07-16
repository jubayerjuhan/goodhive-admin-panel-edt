import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import ReferralsTable from "@/components/Tables/ReferralsTables";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Referrals | Goodhive",
};

const JobsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Referrals" />

      <div className="flex flex-col gap-10">
        <ReferralsTable />
      </div>
    </>
  );
};

export default JobsPage;
