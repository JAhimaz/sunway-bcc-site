import { CompanyDetails } from "@/components/Admin/Company/Company";
import { DATA_API } from "@/utils/APIs";

const CreateCompany = async (sendData: {
  address: string,
  key: string,
  // company
  company: CompanyDetails
}) => {
  const data = await fetch(`${DATA_API}/api/admin/company/createcompany`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${sendData.address}`,
      "key": `${sendData.key}`
    },
    body: JSON.stringify({
      company: sendData.company
    })
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default CreateCompany;