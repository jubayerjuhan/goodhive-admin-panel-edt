import React from "react";

type Props = {
  name: string;
};

export const CompanyApproveTemplate = ({ name }: Props) => {
  return (
    <div>
      <p>Hi {name},</p>
      <p>
        Fantastic news – {name} is now officially part of the GoodHive community! A hearty welcome from all of us 🎉.
        You&apos;re now in the perfect spot to meet and collaborate with top-tier IT talents who are as excited about
        innovation and excellence as you are.
      </p>
      <p>
        Here&apos;s what we suggest as your next exciting step: Post your first job on GoodHive. It&apos;s the quickest way to tap
        into our pool of A-list IT professionals eager to bring their expertise to your projects. Here&apos;s how to get
        started:
      </p>
      <ul>
        <li>Log into your GoodHive account.</li>
        <li>Navigate to the &apos;Create Job&apos; section.</li>
        <li>Fill in the details about the role, the skills you&apos;re looking for.</li>
        <li>
          Quickly engage our community with your job offer by provisioning the mission fees in our smart contract. And
          voila! You&apos;re on your way to finding the perfect match for your projects.
        </li>
      </ul>
      <p>We&apos;re not just about connections; we&apos;re about creating a movement. By joining GoodHive, [Company Name] is at the forefront of redefining the Future of Work. This is where innovative projects meet exceptional talent. This is where your next success story begins.</p>
      <p>Thank you for choosing to experiment this journey with us. We&apos;re excited to see the remarkable things [Company Name] and our IT talents will achieve together.</p>
      <p>Got any questions or need a hand getting started? Our team is always here to help.</p>
      <p>Let&apos;s create something incredible!</p>

      <br />
      <p>Warm Regards,</p>
      <p>The GoodHive Core Team 🐝</p>
    </div>
  );
};
