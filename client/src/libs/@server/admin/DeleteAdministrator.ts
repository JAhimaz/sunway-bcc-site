import { DATA_API } from "@/utils/APIs";

const DeleteAdministrator = async (address: string, key: string, addressToDelete: string) => {
  const data = await fetch(`${DATA_API}/api/admin/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${address}`,
      "key": `${key}`
    },
    body: JSON.stringify({
      address: addressToDelete
    })
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default DeleteAdministrator;