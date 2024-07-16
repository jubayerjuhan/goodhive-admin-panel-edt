import React from "react";

type Props = {
  name: string;
};

export const CompanyRejectTemplate = ({ name }: Props) => {
  return (
    <div>
      <p>Hi {name},</p>
      <p>Thank you for your interest in joining the GoodHive community. We&apos;re eager to connect innovative companies with top-tier IT talent, and we were looking forward to learning more about {name}.</p>
      <p>However, upon reviewing your profile, we noticed that the company description provided doesn&apos;t fully meet our requirements for clarity and detail. A comprehensive and accurate description is vital for our IT talents to understand your company&apos;s mission, culture, and the kind of projects you undertake. This ensures a perfect alignment between your needs and the skills of our community members.</p>
      <p>We encourage you to reapply with an updated company profile that vividly outlines {name}&apos;s values, goals, and the unique opportunities you offer. Here are a few tips to enhance your company description:</p>
      <ul>
        <li>Highlight your company&apos;s mission and vision.</li>
        <li>Describe your company culture and work environment.</li>
        <li>Elaborate on the types of projects and technologies you work with.</li>
        <li>Mention any notable achievements or milestones.</li>
      </ul>
      <p>Once your profile is updated, please resubmit your application. We are keen to review it again and hopefully welcome {name} into our community.</p>
      <p>If you have any questions or need assistance in updating your profile, our team is here to help.</p>
      <p>We look forward to seeing [Company Name]&apos;s updated profile and to the possibility of a fruitful collaboration.</p>

      <p>Best regards,</p>
      <p>The GoodHive Team 🐝</p>
    </div>
  );
};
