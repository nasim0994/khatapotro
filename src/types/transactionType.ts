import { TCategory } from "./categoryTypes";
import { TUser } from "./userType";

export type TTransaction = {
  _id: string;
  user: TUser;
  category: TCategory;
  type: "income" | "expense";
  amount: number;
  date: Date;
  note?: string;
};
