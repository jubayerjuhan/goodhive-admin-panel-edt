// import { sendEmail } from "@/app/utils/sendEmail";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL || "", {
  ssl: {
    rejectUnauthorized: false, // This allows connecting to a database with a self-signed certificate
  },
});

// Force the browser to always fetch the latest data from the server
export const revalidate = 0;

export async function POST(request: Request) {
  const { walletAddress, type, status, referrer } = await request.json();
  console.log("walletAddress", walletAddress, type, status);

  try {
    if (type === "talent") {
      await sql`
      UPDATE goodhive.users
      SET
        talent_status = ${status}
      WHERE wallet_address = ${walletAddress}`;
    }
    if (type === "mentor") {
      await sql`
      UPDATE goodhive.users
      SET
        mentor_status = ${status}
      WHERE wallet_address = ${walletAddress}`;
    }
    if (type === "recruiter") {
      await sql`
      UPDATE goodhive.users
      SET
        recruiter_status = ${status}
      WHERE wallet_address = ${walletAddress}`;
    }

    if (referrer) {
      const user = await sql`
      SELECT *
      FROM goodhive.referrals
      WHERE wallet_address = ${referrer}
      `;

      console.log("ReffUser >>>", user[0]);

      if (user.length) {
        const approvedTalents = user[0].approved_talents;

        const isAlreadyReferred = approvedTalents && approvedTalents.includes(walletAddress);
        if (!isAlreadyReferred) {
          await sql`
        UPDATE goodhive.referrals
        SET
          approved_talents = ${approvedTalents ? [...approvedTalents, walletAddress] : [walletAddress]}
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
