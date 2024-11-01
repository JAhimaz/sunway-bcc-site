"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Jobs.module.scss";
import Seperator from "../Molecules/Seperator/Seperator";
import JobItem, { JobItemProps } from "./JobItem/JobItem";
import { useEffect, useState } from "react";
import FetchJobs from "@/libs/jobs/FetchJobs";
import Loader from "../Loader/Loader";

const Jobs = () => {

  const t = useTranslations("Jobs")
  const headline = t("title");

  const [search, setSearch] = useState<string>("");
  const [jobs, setJobs] = useState<JobItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchJobs().then((jobs) => {
      setLoading(false);
      setJobs(jobs);
    });
  }, [])

  return (
    <section className={styles.main}>
      <GridHoverBox />
      <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
        &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>{t("headline-1")}</Texts>{t("headline-2")}
      </Texts>
      <span className={styles.headline}>
        {headline.split("").map((char, index) => {
          return (
            <Texts key={index} color="var(--text)" fontSize="headline" className={styles.headlineChar} style={{
              animationDelay: `${index * 0.075}s`
            }}>
              {char}
            </Texts>
          )
        })}
      </span>
      <Seperator />
      <section className={styles.layout}>
        {/* Filter / Search Bar */}
        <input className={styles.searchInput} placeholder={"Search..."} onChange={e => setSearch(e.target.value)}  />
        { loading && <Loader /> }
        
        {/* Side Scrolling for Mobile */}
        <section className={styles.jobListings}>
          {jobs.filter(
            job => job.jobTitle.toLowerCase().includes(search.toLowerCase()) || job.companyName.toLowerCase().includes(search.toLowerCase())
          ).map((job: JobItemProps, index: number) => {
            return (
              <JobItem key={index} {...job} />
            )
          })}
        </section>

        {/* Main Panel */}
      </section>

    </section>  
  )
}

export default Jobs;