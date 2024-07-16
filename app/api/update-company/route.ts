import { sendEmail } from "@/app/utils/sendEmail";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL || "", {
  ssl: {
    rejectUnauthorized: false, // This allows connecting to a database with a self-signed certificate
  },
});

// Force the browser to always fetch the latest data from the server
export const revalidate = 0;

export async function POST(request: Request) {
  const { walletAddress, status, referrer } = await request.json();
  console.log("walletAddress", walletAddress, status);
  try {
    await sql`
      UPDATE goodhive.companies
      SET
        status = ${status}
      WHERE wallet_address = ${walletAddress}`;

    if (referrer) {
      const user = await sql`
        SELECT *
        FROM goodhive.referrals
        WHERE wallet_address = ${referrer}
        `;

      if (user.length) {
        const approvedCompanies = user[0].approved_companies;
        const isAlreadyReferred = approvedCompanies && approvedCompanies.includes(walletAddress);
        if (!isAlreadyReferred) {
          await sql`
          UPDATE goodhive.referrals
          SET
            approved_companies = ${approvedCompanies ? [...approvedCompanies, walletAddress] : [walletAddress]}
          WHERE wallet_address = ${referrer}
          `;
        }
      }
    }

    return new Response(JSON.stringify({ message: "status updated successfully" }));
  } catch (error) {
    console.error("Error updating status:", error);

    return new Response(JSON.stringify({ message: "Error updating status" }), {
      status: 500,
    });
  }
}
