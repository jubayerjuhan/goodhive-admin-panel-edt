export type profileTypes = {
  talent: boolean;
  mentor: boolean;
  recruiter: boolean;
};

export type Package = {
  name: string;
  price: number;
  invoiceDate: string;
  status: string;
};

export type UserDetails = {
  name: string;
  types: profileTypes;
  porfileLink: string;
  status: {
    talent: string;
    mentor: string;
    recruiter: string;
  };
  walletAddress: string;
  referrer: string;
};
