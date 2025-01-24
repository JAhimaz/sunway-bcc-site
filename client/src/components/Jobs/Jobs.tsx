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
import Button from "../Molecules/Buttons/Button";

const Jobs = () => {

  const t = useTranslations("Jobs")
  const headline = t("title");

  // Reworking how Jobs work.

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
        {/* <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          width: "100%",
        }}>
          <input className={styles.searchInput} placeholder={"Search..."} onChange={e => setSearch(e.target.value)}  />
          <button className={styles.button} onClick={() => null}>Search</button>
        </div> */}
        

        {/* <section className={styles.jobListings}>
          {jobs.map((job: JobItemProps, index: number) => {
            return (
              <JobItem key={index} {...job} />
            )
          })}
        </section> */}


      </section>

    </section>  
  )
}

export default Jobs;