import React from "react";

type Props = {
  name: string;
};

export const TalentApproveTemplate = ({ name }: Props) => {
  return (
    <div>
      <p>Hi {name},</p>
      <p>
        We are thrilled to share some fantastic news with you – you&apos;ve officially been vetted as an A-list talent
        in the GoodHive community! 🎉 Your skills, commitment, and potential for excellence have truly impressed us, and
        we&apos;re excited to see you thrive in collaborations with our clients.
      </p>
      <p>
        As an A-list talent, you represent the best of what GoodHive offers. We believe in your ability to deliver
        outstanding results and set new benchmarks for excellence in the IT and Web3 space. Here&apos;s to many
        successful projects and milestones ahead!
      </p>
      <p>
        Also, we thought you might want to share this great news with your network. Here&apos;s a personalized LinkedIn
        message that you can use. Feel free to edit it as you see fit:
      </p>
      <p>🚀 Excited to Share: I&apos;ve been recognized as an A-list Talent at GoodHive!</p>
      <p>
        I&apos;m thrilled to announce that I&apos;ve successfully passed the rigorous vetting process at GoodHive and am
        now part of an elite community of IT professionals. This marks a new chapter in my career where I aim to deliver
        excellence in every project and collaboration.
      </p>
      <p>
        Looking forward to connecting with innovative companies and contributing to impactful projects in the Web3
        space. Let&apos;s build the future of work together!
      </p>
      <p>Join me in this journey: [Your Referral Link](You can claim your referral link from your profile)</p>
      <p>#GoodHive #Web3 #ITtalent #CareerMilestone #FutureOfWork</p>
      <p>
        Feel free to add this message to your LinkedIn profile to celebrate your accomplishment and invite others to
        join GoodHive. Remember, you&apos;ll earn a bonus for each successful referral!
      </p>
      <p>
        Once again, congratulations, {name}! We are proud to have you on board and can&apos;t wait to see the
        amazing work you&apos;ll do.
      </p>
      <br />
      <p>Best Wishes,</p>
      <p>The GoodHive Core Team 🐝</p>
    </div>
  );
};
