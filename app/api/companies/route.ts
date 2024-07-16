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
    const companies = await sql`SELECT * FROM goodhive.companies`;
    const filteredCompanies = companies.filter((item) => item.status !== null);
    const formattedCompanies = filteredCompanies.map((item) => ({
      companyName: item.designation,
      profileLink: `${process.env.NEXT_PUBLIC_CLIENT_URL}/companies/${item.wallet_address}`,
      status: item.status,
      walletAddress: item.wallet_address,
      referrer: item.referrer ? item.referrer : "",
    }));

    console.log("formatted companies>>", formattedCompanies);

    return new Response(JSON.stringify(formattedCompanies));
  } catch (error) {
    console.error("Error fetching job offers:", error);

    return new Response(JSON.stringify({ message: "Error fetching job offers" }), {
      status: 500,
    });
  }
}
