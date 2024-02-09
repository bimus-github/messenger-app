export enum Checking_Account_Status {
  CHECKING = "CHECKING",
  SIGNED_IN = "SIGNED_IN",
  LOGED_OUT = "LOGED_OUT",
}

export type User_Type = {
  id: string;
  fName: string;
  lName: string;
  phone: string;
  image: string;
  status: User_Status;
};

export enum User_Status {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
