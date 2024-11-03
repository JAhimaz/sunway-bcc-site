import { DATA_API } from "@/utils/APIs";

const SetAdministrator = async (address: string, key: string, addressToSet: string) => {
  const data = await fetch(`${DATA_API}/api/admin/setadmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${address}`,
      "key": `${key}`
    },
    body: JSON.stringify({
      address: addressToSet
    })
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default SetAdministrator;