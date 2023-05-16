import { TablerIconsProps } from "@tabler/icons-react";

declare interface USER {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  cin: string;
  verified: boolean;
  role: "type.admin" | "type.operator";
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

declare interface SESSION_OBJECT {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  cin: string;
  phone?: string;
  role: "type.admin" | "type.A" | "type.B";
}

declare interface navItemsProps {
  name: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  to: string;
  sub?: navItemsProps[];
}

export type { navItemsProps, SESSION_OBJECT };
