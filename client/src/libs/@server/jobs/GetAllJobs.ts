import { DATA_API } from "@/utils/APIs";

const GetAllJobs = async (page: number) => {
  const data = await fetch(`${DATA_API}/api/jobs?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data.data
  })

  return data
}

export default GetAllJobs;