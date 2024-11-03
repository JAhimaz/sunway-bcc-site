import { Stamp } from "@/components/Profile/Stamps/types";
import { DATA_API } from "@/utils/APIs";

export type User = {
  _id: string;
  name: string;
  address: string;
  bio?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  createdAt: string;
  exp: number;
  isAdmin: boolean;
  key?: string;
  stamps: Stamp[];
  updatedAt: string;
  version: number;
}

const GetUser = async (address: string) => {
  const data = await fetch(`${DATA_API}/api/user/${address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data.data
  })

  return data
}

export default GetUser;