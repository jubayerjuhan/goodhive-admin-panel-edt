"use client";

import { UserDetails } from "@/types/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { generateProfileTypeMsg } from "@/app/utils/userDetails";

const UsersTable = () => {
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleApprove = async (
    walletAddress: string,
    type: string,
    referrer: string
  ) => {
    toast.loading("Processing...");
    const res = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress,
        type,
        status: "approved",
        referrer,
      }),
    });
    if (!res.ok) {
      toast.error("Something went wrong!");
    } else {
      const res = await fetch(`/api/get-user?walletAddress=${walletAddress}`);
      const profile = await res.json();
      const userEmail = profile.email;
      const userName = profile.first_name;

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          subject: `Congratulations, ${userName}! You're Officially an A-List Talent at GoodHive 🌟`,
          type: "talent-approve",
        }),
      });

      toast.success("Profile Saved!");
      fetchUserDetails();
    }
  };

  const handleReject = async (walletAddress: string, type: string) => {
    toast.loading("Processing...");
    const res = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress, type, status: "disapproved" }),
    });
    if (!res.ok) {
      toast.error("Something went wrong!");
    } else {
      const res = await fetch(`/api/get-user?walletAddress=${walletAddress}`);
      const profile = await res.json();
      const userEmail = profile.email;
      const userName = profile.first_name;

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          subject: "Keep Growing with Us - Your GoodHive Journey",
          type: "talent-reject",
        }),
      });

      toast.success("Profile Saved!");
      fetchUserDetails();
    }
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/user-profiles");
      const data = await res.json();
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const adminVerificationKey = process.env.NEXT_PUBLIC_ADMIN_VERIFICATION_KEY;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Profile Link
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((packageItem, key) => {
                const profileTypeMsg = generateProfileTypeMsg(
                  packageItem.types
                );
                return (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.name}
                      </h5>
                      <p className="text-sm">{profileTypeMsg}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link
                        href={`${packageItem.porfileLink}?vkey=${adminVerificationKey}&ref=admin`}
                      >
                        <p className="text-black dark:text-white">
                          {packageItem.porfileLink}
                        </p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col gap-4 py-5 px-4 dark:border-strokedark">
                      {packageItem.status.talent && (
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 my-3 py-1 px-3 text-sm font-medium ${
                            packageItem.status.talent === "approved"
                              ? "text-success bg-success"
                              : packageItem.status.talent === "disapproved"
                              ? "text-danger bg-danger"
                              : "text-warning bg-warning"
                          }`}
                        >
                          {packageItem.status.talent} as talent
                        </p>
                      )}
                      {packageItem.status.mentor && (
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 my-3 py-1 px-3 text-sm font-medium ${
                            packageItem.status.mentor === "approved"
                              ? "text-success bg-success"
                              : packageItem.status.mentor === "disapproved"
                              ? "text-danger bg-danger"
                              : "text-warning bg-warning"
                          }`}
                        >
                          {packageItem.status.mentor} as mentor
                        </p>
                      )}
                      {packageItem.status.recruiter && (
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 my-3 py-1 px-3 text-sm font-medium ${
                            packageItem.status.recruiter === "approved"
                              ? "text-success bg-success"
                              : packageItem.status.recruiter === "disapproved"
                              ? "text-danger bg-danger"
                              : "text-warning bg-warning"
                          }`}
                        >
                          {packageItem.status.recruiter} as recruiter
                        </p>
                      )}
                    </td>
                    <td className="border-b border-[#eee] d-flex flex-col py-5 px-4 dark:border-strokedark">
                      {packageItem.status.talent === "pending" && (
                        <div className="flex items-center my-3 space-x-3.5">
                          <button
                            onClick={() =>
                              handleApprove(
                                packageItem.walletAddress,
                                "talent",
                                packageItem.referrer
                              )
                            }
                            className="bg-success text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(packageItem.walletAddress, "talent")
                            }
                            className="bg-danger text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Disapprove
                          </button>
                        </div>
                      )}
                      {packageItem.status.mentor === "pending" && (
                        <div className="flex items-center my-3 space-x-3.5">
                          <button
                            onClick={() =>
                              handleApprove(
                                packageItem.walletAddress,
                                "mentor",
                                packageItem.referrer
                              )
                            }
                            className="bg-success text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(packageItem.walletAddress, "mentor")
                            }
                            className="bg-danger text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Disapprove
                          </button>
                        </div>
                      )}
                      {packageItem.status.recruiter === "pending" && (
                        <div className="flex items-center my-3 space-x-3.5">
                          <button
                            onClick={() =>
                              handleApprove(
                                packageItem.walletAddress,
                                "recruiter",
                                packageItem.referrer
                              )
                            }
                            className="bg-success text-white px-3 py-2 border-none hover:text-primary"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(
                                packageItem.walletAddress,
                                "recruiter"
                              )
                            }
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

export default UsersTable;
