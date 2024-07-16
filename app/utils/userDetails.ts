import { profileTypes } from "@/types/users";

export const generateProfileTypeMsg = (types: profileTypes) => {
  console.log("types", types);
  const profileTypes = [];
  if (types.talent) {
    profileTypes.push("Talent");
  }
  if (types.mentor) {
    profileTypes.push("Mentor");
  }
  if (types.recruiter) {
    profileTypes.push("Recruiter");
  }
  return profileTypes.join(", ");
};
