import { DATA_API } from "@/utils/APIs";

const GetAllJobs = async (page: number, search?: string) => {
  const data = await fetch(`${DATA_API}/api/jobs?page=${page}${
    search ? `&search=${search}` : ""
  }`, {
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