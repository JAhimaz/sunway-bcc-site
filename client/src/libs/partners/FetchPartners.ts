
export type Partner = {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
}

const FetchPartners = async () => {
    try {
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/494002/?user_field_names=true&order_by=name`, {
        method: 'GET',
        headers: {
          Authorization: `Token rK3SVomxuHfqBl5mKMDONQhkA7wymwR6`,
        },
      })

      const team: Partner[] = await response.json()
      .then((data) => data?.results)
      .then((rows) => {
        return rows.map((row: any) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          logo: row.logo.length > 0 ? row.logo[0].url : "",
          website: row.website,
        })) as Partner[]
      })
      return team;

    } catch (error) {
      console.log(error)
      return []
    }
}

export default FetchPartners;