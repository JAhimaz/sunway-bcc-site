import { Stamp } from "@/components/Profile/Stamps/Stamps";
import { DATA_API } from "@/utils/APIs";

export type User = {
  _id: string;
  address: string;
  createdAt: string;
  exp: number;
  isAdmin: boolean;
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