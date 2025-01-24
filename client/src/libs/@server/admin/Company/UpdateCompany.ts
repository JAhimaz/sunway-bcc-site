import { CompanyDetails } from "@/components/Admin/Company/Company";
import { DATA_API } from "@/utils/APIs";

const UpdateCompany = async (address: string, key: string, company: CompanyDetails) => {
  const data = await fetch(`${DATA_API}/api/admin/company/updatecompany/${company._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${address}`,
      "key": `${key}`
    },
    body: JSON.stringify({
      company
    })
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default UpdateCompany;