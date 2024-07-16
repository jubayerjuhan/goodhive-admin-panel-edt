"use client";

import { Resend } from "resend";
import * as React from "react";

import { TalentApproveTemplate } from "@/email-templates/talent-approve";
import { TalentRejectTemplate } from "@/email-templates/talent-reject";
import { CompanyApproveTemplate } from "@/email-templates/company-approve";
import { CompanyRejectTemplate } from "@/email-templates/company-reject";

const resend = new Resend(process.env.RESEND_API_KEY);
const goodhiveEmail = "contact@goodhive.io";

const TEMPLATES = {
  "talent-approve": TalentApproveTemplate,
  "talent-reject": TalentRejectTemplate,
  "company-approve": CompanyApproveTemplate,
  "company-reject": CompanyRejectTemplate,
};

type TemplateType = keyof typeof TEMPLATES;

type sendEmailProps = {
  name: string;
  email: string;
  type: TemplateType;
  subject: string;
};

export async function sendEmail(props: sendEmailProps) {
  const { name, email, type, subject } = props;

  try {
    const { data, error } = await resend.emails.send({
      from: `GoodHive <${goodhiveEmail}>`,
      to: [email],
      subject,
      bcc: [goodhiveEmail],
      react: TEMPLATES[type]({
        name,
      }) as React.ReactElement,
    });
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
