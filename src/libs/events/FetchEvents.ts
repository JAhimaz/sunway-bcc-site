
import { EventItem } from "@/components/Events/EventPage"

const FetchEvents = async () => {
    try {
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/296735/?user_field_names=true&size=10&order_by=-startDate`, {
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
          image: row.image.length > 0 ? row.image[0].url : "",
          url: row.url,
          pinned: row.pinned
        })) as EventItem[]
      })

      console.log(events)

      return events;

    } catch (error) {
      console.log(error)
      return []
    }
}

export default FetchEvents;