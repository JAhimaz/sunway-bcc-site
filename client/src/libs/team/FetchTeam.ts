
export type TeamMember = {
  id: number;
  fullName: string;
  position: {
    id: number;
    value: string;
  };
  image: string;
  imageAlt: string;
}

const FetchTeam = async () => {
    try {
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/328269/?user_field_names=true`, {
        method: 'GET',
        headers: {
          Authorization: `Token rK3SVomxuHfqBl5mKMDONQhkA7wymwR6`,
        },
      })

      const team: TeamMember[] = await response.json()
      .then((data) => data?.results)
      .then((rows) => {
        return rows.map((row: any) => ({
          id: row.id,
          fullName: row.fullName,
          position: row.position.value,
          image: row.image.length > 0 ? row.image[0].url : "",
          imageAlt: row.imageAlt.length > 0 ? row.imageAlt[0].url : "",
        })) as TeamMember[]
      })
      return team;

    } catch (error) {
      console.log(error)
      return []
    }
}

export default FetchTeam;