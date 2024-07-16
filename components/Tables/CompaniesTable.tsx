"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { JobDetails } from "@/types/jobs";

const CompaniesTable = () => {
  const [jobsData, setJobsData] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleApprove = async (walletAddress: string, referrer: string) => {
    toast.loading("Processing...");
    const res = await fetch("/api/update-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress, status: "approved", referrer }),
    });
    if (!res.ok) {
      toast.error("Something went wrong!");
    } else {
      const res = await fetch(`/api/get-company?walletAddress=${walletAddress}`);
      const profile = await res.json();
      const userEmail = profile.email;
      const userName = profile.designation;

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          subject: `Welcome Aboard, ${userName}! Let's Start Shaping the Future of Work 🚀`,
          type: "company-approve",
        }),
      });


      toast.success("Profile Saved!");
      fetchUserDetails();
    }
  };

  const handleReject = async (walletAddress: string) => {
    toast.loading("Processing...");
    const res = await fetch("/api/update-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress, status: "disapproved" }),
    });
    if (!res.ok) {
      toast.error("Something went wrong!");
    } else {
      const res = await fetch(`/api/get-company?walletAddress=${walletAddress}`);
      const profile = await res.json();
      const userEmail = profile.email;
      const userName = profile.designation;

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          subject: `Update Needed: Your GoodHive Application`,
          type: "company-reject",
        }),
      });

      toast.success("Profile Saved!");
      fetchUserDetails();
    }
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/companies");
      const data = await res.json();
      setJobsData(data);
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
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Company Name</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Company Profile</th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobsData.map((packageItem, key) => {
                return (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">{packageItem.companyName}</h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link href={packageItem.profileLink}>
                        <p className="text-black dark:text-white">{packageItem.profileLink}</p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col gap-4 py-5 px-4 dark:border-strokedark">
                      {packageItem.status && (
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 my-3 py-1 px-3 text-sm font-medium ${
                            packageItem.status === "approved"
                              ? "text-success bg-success"
                              : packageItem.status === "disapproved"
                              ? "text-danger bg-danger"
                              : "text-warning bg-warning"
                          }`}
                        >
                          {packageItem.status}
                        </p>
                      )}
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col py-5 px-4 dark:border-strokedark">
                      {packageItem.status === "pending" && (
                        <div className="flex items-center my-3 space-x-3.5">
                          <button
                            onClick={() => handleApprove(packageItem.walletAddress, packageItem.referrer)}
                            className="bg-success text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(packageItem.walletAddress)}
                            className="bg-danger text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Disapprove
                          </button>
                        </div>
                      )}
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

export default CompaniesTable;
