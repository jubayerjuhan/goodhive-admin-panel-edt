import React from "react";

type Props = {
  name: string;
};

export const TalentRejectTemplate = ({ name }: Props) => {
  return (
    <div>
      <p>Hi {name},</p>
      <p>
        Thank you for taking the time to create a profile with us at GoodHive. We truly appreciate your interest in
        joining our community.
      </p>
      <p>
        After careful consideration, we find that your current profile isn&apos;t fully aligned with our focus areas at
        this moment. This could be due to the specifics of your experience or the current detailing of your profile. But
        don&apos;t let this discourage you!
      </p>
      <p>
        The world of IT and Web3 is always evolving, and so are the opportunities at GoodHive. We encourage you to
        continue honing your skills and expanding your experiences. As you grow, we would love to see you reapply. Your
        future application will be most welcome, especially as you gain the experience that aligns more closely with our
        needs or as we expand to include new skill sets in our community.
      </p>
      <p>
        In the meantime, keep an eye on GoodHive. Our community is dynamic, and we are continuously exploring new areas
        and talents. You may find that we soon open doors to skill sets that perfectly match your expertise.
      </p>
      <p>
        Thank you again for your interest in GoodHive. We&apos;re excited about the possibility of having you with us in
        the future and witnessing your professional growth.
      </p>
      <br />
      <p>Best Wishes,</p>
      <p>The GoodHive Team 🐝</p>
    </div>
  );
};
