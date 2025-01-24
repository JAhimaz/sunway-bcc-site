import { DATA_API } from "@/utils/APIs";

const DeleteCompany = async (address: string, key: string, id: string) => {
  const data = await fetch(`${DATA_API}/api/admin/company/deletecompany/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${address}`,
      "key": `${key}`
    }
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default DeleteCompany;