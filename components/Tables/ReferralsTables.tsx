"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { ReferralUser } from "@/types/referral";

const ReferralsTable = () => {
  const [referrals, setReferrals] = useState<ReferralUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/referrals");
      const data = await res.json();
      setReferrals(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Wallet Address</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Referral Code</th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Talents</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Companies</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Approved Talents</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Approved Companies</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((packageItem, key) => {
                return (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">{packageItem.walletAddress}</h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{packageItem.referralCode}</p>
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col gap-4 py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{packageItem.talents}</p>
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col gap-4 py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{packageItem.companies}</p>
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col gap-4 py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{packageItem.approvedTalents}</p>
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col gap-4 py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{packageItem.approvedCompanies}</p>
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReferralsTable;
