
import { EventItem } from "@/components/Events/EventPage"

const FetchEvents = async () => {
    try {
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/296735/?user_field_names=true&size=30&order_by=-startDate`, {
        method: 'GET',
        headers: {
          Authorization: `Token rK3SVomxuHfqBl5mKMDONQhkA7wymwR6`,
        },
      })

      const events: EventItem[] = await response.json()
      .then((data) => data?.results)
      .then((rows) => {
        return rows.map((row: any) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          location: row.location,
          startDate: row.startDate,
          endDate: row?.endDate ?? undefined,
          image: row.image.length > 0 ? row.image[0].url : "",
          url: row.url,
          pinned: row.pinned,
          discount_code: row.discount_code,
          discount_amount: row.discount_amount,
          discount_offer: row.discount_offer === "" ? undefined : row.discount_offer,
        })) as EventItem[]
      })

      return events;

    } catch (error) {
      console.log(error)
      return []
    }
}

export default FetchEvents;