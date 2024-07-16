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
    const users = await sql`SELECT * FROM goodhive.users`;
    const filteredUsers = users.filter(
      (item) => item.talent_status !== null || item.mentor_status !== null || item.recruiter_status !== null
    );
    const formattedJobs = filteredUsers.map((item) => ({
      name: item.first_name + " " + item.last_name,
      types: { talent: item.talent, mentor: item.mentor, recruiter: item.recruiter },
      porfileLink: `${process.env.NEXT_PUBLIC_CLIENT_URL}/talents/${item.wallet_address}`,
      status: {
        talent: item.talent_status,
        mentor: item.mentor_status,
        recruiter: item.recruiter_status,
      },
      walletAddress: item.wallet_address,
      referrer: item.referrer ? item.referrer : "",
    }));

    console.log("formattedJobs >>", formattedJobs);

    return new Response(JSON.stringify(formattedJobs));
  } catch (error) {
    console.error("Error fetching job offers:", error);

    return new Response(JSON.stringify({ message: "Error fetching job offers" }), {
      status: 500,
    });
  }
}
