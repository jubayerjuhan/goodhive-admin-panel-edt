import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL || "", {
  ssl: {
    rejectUnauthorized: false, // This allows connecting to a database with a self-signed certificate
  },
});

// Force the browser to always fetch the latest data from the server
export const revalidate = 0;
export async function GET() {
  try {
    const referrals = await sql`SELECT * FROM goodhive.referrals`;

    const formattedReferrals = referrals.map((item) => ({
      walletAddress: item.wallet_address,
      referralCode: item.referral_code,
      talents: item.talents ? item.talents.length : 0,
      companies: item.companies ? item.companies.length : 0,
      approvedTalents: item.approved_talents ? item.approved_talents.length : 0,
      approvedCompanies: item.approved_companies ? item.approved_companies.length : 0,
    }));

    console.log("formatted referrals>>", formattedReferrals);

    return new Response(JSON.stringify(formattedReferrals));
  } catch (error) {
    console.error("Error fetching job offers:", error);

    return new Response(JSON.stringify({ message: "Error fetching job offers" }), {
      status: 500,
    });
  }
}
