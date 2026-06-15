import { TUser } from "./userType";

export type TCategory = {
  _id: string;
  name: string;
  icon: {
    color: string;
    family: string;
    name: string;
  };
  user: TUser;
  type: "income" | "expense";
};
