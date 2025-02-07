"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Jobs.module.scss";
import Seperator from "../Molecules/Seperator/Seperator";
import JobItem, { JobItemProps } from "./JobItem/JobItem";
import { useEffect, useState } from "react";
import GetAllJobs from "@/libs/@server/jobs/GetAllJobs";
import Loader from "../Loader/Loader";

// Replace any with Job Type 
type Job = {
  _id: string,
  companyId: string,
  jobTitle: string,
  jobDescription: string,
  jobUrl: string,
  minPay: number,
  maxPay: number,
  paymentSchedule: string,
  payCurrency: string,
  location: string,
  timezone: string,
  isRemote: string,
  jobType: string,
  skill: string,
  tags: string[],
  createdAt: string,
  updatedAt: string,
  __v: number,
  company: {
    _id: string,
    name: string,
    twitter: string,
    linkedin: string,
    instagram: string,
    github: string,
    discord: string,
    website: string,
    description: string,
    headquarters: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
  }
}

type Metadata = {
  totalCount: number,
  page: number,
  nextPage: number,
  pageCount: number
}

const Jobs = () => {

  const t = useTranslations("Jobs")
  const headline = t("title");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    setLoading(true);
    GetAllJobs(page).then((data) => {
      setJobs(data.jobs)
      setSelectedJob(data.jobs[0])
      setMetadata(data.metadata)
      setLoading(false);
    })
  }, [page])

  useEffect(() => {
    console.log(jobs, metadata)
  }, [jobs, metadata])

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

      {loading && <Loader />}

      { jobs && !loading && (
        <section id="jobs_section" className={styles.jobsSection}>
          <section id="jobs_section_listings" className={styles.jobsSectionListings}>
          {/* Left side for Listing Jobs */}
            <section id="jobs_section_listings_left" className={styles.jobsSectionListingsLeft}>
              { jobs.length > 0 ? jobs.map((job: Job, index: number) => {
                return (
                  <div key={job._id} onClick={() => setSelectedJob(job)} className={styles.jobItem}>
                    {job.jobTitle}
                  </div>
                )
              }) : <Texts color="var(--text-light)" fontSize="xs" className={styles.noJobs}>{t("no-jobs")}</Texts> }
            </section>
          {/* Right side for Job information */}
            <section id="jobs_section_listings_right" className={styles.jobsSectionListingsRight}>

            </section>
          </section>

          {/* Navigation Buttons / Page Number */}
          <section id="jobs_section_navigation">

          </section>
        </section>
      )}
    </section>  
  )
}

export default Jobs;