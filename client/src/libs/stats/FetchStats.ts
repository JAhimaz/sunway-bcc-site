
export type Statistic = {
  id: number;
  stat: string;
  value: number;
}

const FetchStats = async () => {
    try {
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/327917/?user_field_names=true`, {
        method: 'GET',
        headers: {
          Authorization: `Token rK3SVomxuHfqBl5mKMDONQhkA7wymwR6`,
        },
      })

      const team: Statistic[] = await response.json()
      .then((data) => data?.results)
      .then((rows) => {
        return rows.map((row: any) => ({
          id: row.id,
          stat: row.name,
          value: row.statistic,
        })) as Statistic[]
      })

      console.log(team)

      return team;

    } catch (error) {
      console.log(error)
      return []
    }
}

export default FetchStats;