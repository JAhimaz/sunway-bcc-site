import { DATA_API } from "@/utils/APIs";

const SetStamps = async (sendData: {
  address: string,
  key: string,
  addresses: string[],
  eventName: string,
  eventType: string,
  eventDate: string
}) => {
  const data = await fetch(`${DATA_API}/api/stamps/setbulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "address": `${sendData.address}`,
      "key": `${sendData.key}`
    },
    body: JSON.stringify({
      addresses: sendData.addresses,
      eventName: sendData.eventName,
      eventType: sendData.eventType,
      eventDate: sendData.eventDate
    })
  })
  .then((res) => res.json())
  .then((data) => {
    return data
  })

  return data
}

export default SetStamps;