import { DATA_API } from "@/utils/APIs";

const GetTopUsers = async () => {
  const data = await fetch(`${DATA_API}/api/topusers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data.data
  })

  return data
}

export default GetTopUsers;