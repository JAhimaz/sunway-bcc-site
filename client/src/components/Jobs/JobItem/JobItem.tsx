"use client";
import Image from "next/image";
import styles from "./JobItem.module.scss";
import { useTranslations } from "next-intl";
import { FC } from "react";
import Texts from "@/components/Atoms/Texts";

export type JobItemProps = {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  url: string;
  logo?: string;
  minPay?: number;
  maxPay?: number;
  payCurrency?: string;
  isSuffix?: boolean;
}

const JobItem: FC<JobItemProps> = ({
  jobTitle,
  companyName,
  jobDescription,
  url,
  logo,
  minPay,
  maxPay,
  payCurrency,
  isSuffix = false,
}) => {
  return (
    <div className={styles.jobItem}>

      {/* Company Icon / Company Name Letter */}
      {/* Job Title */}
      {/* Company Name */}
      <section className={styles.jobMajorDetails}>
          <div className={styles.logoComponent}>
            { logo ? <Image src={logo} alt="Logo" fill /> : 
              <Texts color="var(--text)" fontSize="lg" weight="bold" className={styles.logoLetter}>
                {companyName.charAt(0)}
              </Texts>
            }
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.35rem",
          }}>
            <Texts color="var(--text)" fontSize="md" className={styles.companyName}>
              {jobTitle}
            </Texts>
            <Texts color="var(--text-light)" fontSize="xs" className={styles.jobCompany}>  
              {companyName}
            </Texts>
          </div>
        <section>
        </section>
      </section>

      {/* Quick Job Description */}
      <Texts color="var(--text)" fontSize="sm" className={styles.jobDescription}>
        {jobDescription}
      </Texts>

      {/* Pay if Included */}
      

      {/* Fake Borders for On Hover */}
      <div className={styles.fakeBorderLeft} />
      <div className={styles.fakeBorderRight} />
      <div className={styles.fakeBorderTop} />
      <div className={styles.fakeBorderBottom} />
    </div>
  )
}

export default JobItem;