import { JobDetails } from "@/components/Admin/Jobs/Jobs";
import { DATA_API } from "@/utils/APIs";

const CreateJob = async (sendData: {
  address: string,
  key: string,
  // company
  job: JobDetails
}) => {
  const data = await fetch(`${DATA_API}/api/admin/job/createjob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${sendData.address}`,
      "key": `${sendData.key}`
    },
    body: JSON.stringify({
      job: sendData.job
    })
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default CreateJob;