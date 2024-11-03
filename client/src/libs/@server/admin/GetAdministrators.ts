import { DATA_API } from "@/utils/APIs";

const GetAdministrators = async (address: string, key: string) => {
  const data = await fetch(`${DATA_API}/api/admin/admins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${address}`,
      "key": `${key}`
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data.data
  })

  return data
}

export default GetAdministrators;