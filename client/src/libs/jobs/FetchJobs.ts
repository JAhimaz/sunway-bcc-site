import { JobItemProps } from "@/components/Jobs/JobItem/JobItem"


const FetchJobs = async () => {
    try {
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/380799/?user_field_names=true`, {
        method: 'GET',
        headers: {
          Authorization: `Token rK3SVomxuHfqBl5mKMDONQhkA7wymwR6`,
        },
      })

      const JobList: JobItemProps[] = await response.json()
      .then((data) => data?.results)
      .then((rows) => {
        return rows.map((row: any) => ({
          jobTitle: row.jobTitle,
          companyName: row.companyName,
          jobDescription: row.jobDescription,
          url: row.url,
          logo: row.logo[0].url,
          minPay: row.minPay,
          maxPay: row.maxPay,
          payCurrency: row.payCurrency.value ?? undefined,
          isSuffix: row.isSuffix,
          tags: row.tags,
          isRemote: row.isRemote,
          type: row.type.value,
          paymentMode: row.paymentMode.value ?? undefined,
        })) as JobItemProps[]
      })

      return JobList;

    } catch (error) {
      console.log(error)
      return []
    }
}

export default FetchJobs;