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
import Image from "next/image";
import TimeCalculator from "@/utils/TimeCalculator";

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
    logo?: string,
    name: string,
    twitter?: string,
    linkedin?: string,
    instagram?: string,
    github?: string,
    discord?: string,
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

  return (
    <section className={styles.main}>      
      <GridHoverBox />
      <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
        &#47;&#47;&nbsp;&nbsp;
        { metadata?.totalCount ? 
        <><Texts color="var(--text)" fontSize="xs">{metadata?.totalCount}</Texts>{t("jobsAvailable")}</>
        : <><Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>{t("headline-1")}</Texts>{t("headline-2")}</>
        }
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

      {loading && 
        <section style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: '2rem',
        }}>
          <Loader />
        </section>
      }

      { jobs && !loading && (
        <section id="jobs_section" className={styles.jobsSection}>
          <section id="jobs_section_listings" className={styles.jobsSectionListings}>
          {/* Left side for Listing Jobs */}
            <section id="jobs_section_listings_left" className={styles.jobsSectionListingsLeft}>
              { jobs.length > 0 ? jobs.map((job: Job, index: number) => {
                return (
                  <div key={job._id} onClick={() => setSelectedJob(job)} className={styles.jobItem} style={{
                    backgroundColor: selectedJob?._id === job._id ? "var(--dark-foreground)" : "transparent",
                  }}>
                    <div className={styles.jobItemMainInfo}>
                      <div className={styles.companyLogoContainer} style={{
                      border: job.company?.logo ? `1px solid transparent`: `1px solid var(--foreground)`,
                    }}>
                        { job.company?.logo ? 
                        <Image src={job.company.logo} alt={job.company.name} className={styles.companyLogo} fill /> :
                        <Texts color="var(--text)" fontSize="lg">{job.company.name.charAt(0)}</Texts>
                        }
                      </div>
                      <div className={styles.jobInfo}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                          <Texts color="var(--text)" fontSize="md">{job.jobTitle}</Texts>
                          <Texts color="var(--text-light)" fontSize="xs">{TimeCalculator(job.createdAt)}</Texts>
                        </div>
                        <Texts color="var(--text-light)" fontSize="xs">{job.company.name}</Texts>
                      </div>
                    </div>
                    {/* First letter capital for is Remote */}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Texts color="var(--text-light)" fontSize="xs">{job.location} ({job.isRemote.charAt(0).toUpperCase() + job.isRemote.slice(1)})</Texts>
                      { job.minPay > 0 &&
                      <Texts color="var(--text-light)" fontSize="xs">{job.payCurrency} {job.minPay} {job.maxPay > 0 && <>
                        - {job.payCurrency} {job.maxPay}
                      </>}</Texts>
                      }
                    </div>
                  </div>
                )
              }) : <Texts color="var(--text-light)" fontSize="xs" className={styles.noJobs}>{t("no-jobs")}</Texts> }
            </section>
          {/* Right side for Job information */}
            <section id="jobs_section_listings_right" className={styles.jobsSectionListingsRight}>
              { selectedJob ? 
              <section id="jobs_section_description" className={styles.jobDetails}>
                <div className={styles.jobDetailsHeader}>
                  <div style={{ display: "flex", flexDirection: "row", gap: '1rem' }}>
                    <div className={styles.companyLogoContainerHeader} style={{
                      backgroundColor: selectedJob.company?.logo ? 'transparent' : "var(--dark-foreground)",
                    }}>
                    { selectedJob.company?.logo ? 
                      <Image src={selectedJob.company.logo} alt={selectedJob.company.name} className={styles.companyLogo} fill /> :
                      <Texts color="var(--text)" fontSize="lg">{selectedJob.company.name.charAt(0)}</Texts>
                    }
                    </div>
                    <Texts color="var(--text)" fontSize="lg" weight="bold" className={styles.jobTitle}>{selectedJob.jobTitle}</Texts>
                    <button className={styles.addButton} style={{
                      marginLeft: 'auto'
                    }}>Apply</button>
                  </div>
                  <Texts color="var(--text-light)" fontSize="sm" className={styles.jobCompany}>{selectedJob.company.name}</Texts>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Texts color="var(--text-light)" fontSize="xs">{selectedJob.location} ({selectedJob.isRemote.charAt(0).toUpperCase() + selectedJob.isRemote.slice(1)})</Texts>
                    { selectedJob.minPay > 0 &&
                    <Texts color="var(--text-light)" fontSize="xs">{selectedJob.payCurrency} {selectedJob.minPay} {selectedJob.maxPay > 0 && <>
                      - {selectedJob.payCurrency} {selectedJob.maxPay}
                    </>}</Texts>
                    }
                  </div>
                </div>
                <div className={styles.jobDetailsBody}>
                <Texts color="var(--text-light)" fontSize="sm" align="justify" style={{
                  whiteSpace: 'pre-line'
                }}>{selectedJob.jobDescription}</Texts>
                 <button className={styles.addButton} style={{marginTop: '3rem'}}>Apply</button>
                </div>
              </section>
              : <Texts color="var(--text-light)" fontSize="xs" className={styles.noJobs}>{t("no-jobs")}</Texts> }
            </section>
          </section>

          {/* Navigation Buttons / Page Number */}
          <section id="jobs_section_navigation" style={{
            width: '100%',
          }}>
            {/* Show a previous button, page number, next button.
              if there is no previous pages, make the button disabled with color var(--foreground)
              if there is no next pages, make the button disabled with color var(--foreground)
              default colour is --text
              surround with border 1px solid var(--foreground)
            */}

            { metadata &&
            <div className={styles.navigation}>
              <button className={styles.navigationButton} style={{
                border: `1px solid var(--foreground)`,
                color: metadata?.page === 1 ? `var(--foreground)` : `var(--text)`,
                cursor: metadata?.page === 1 ? 'default' : 'pointer'
              }} onClick={() => setPage(metadata?.page - 1)} disabled={metadata?.page === 1}>{`<`}</button>
              <Texts color="var(--text)" fontSize="sm" className={styles.pageNumber}>{metadata?.page} / {metadata?.pageCount}</Texts>
              <button className={styles.navigationButton} style={{
                border: `1px solid var(--foreground)`,
                color: metadata?.page === metadata?.pageCount ? `var(--foreground)` : `var(--text)`,
                cursor: metadata?.page === metadata?.pageCount ? 'default' : 'pointer'
              }} onClick={() => setPage(metadata?.page + 1)} disabled={metadata?.page === metadata?.pageCount}>{`>`}</button>
            </div>
            }
            
          </section>
        </section>
      )}
    </section>  
  )
}

export default Jobs;