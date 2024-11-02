import { Stamp } from "@/components/Profile/Stamps/types";
import { DATA_API } from "@/utils/APIs";

const GetAdministrators = async (address: string) => {
  const data = await fetch(`${DATA_API}/api/admin/admins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${address}`
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data.data
  })

  return data
}

export default GetAdministrators;