"use client";
import styles from "./JobItem.module.scss";
import { FC } from "react";
import Texts from "@/components/Atoms/Texts";
import Image from "next/image";

export type JobItemProps = {
  jobTitle: string;
  companyName: string;
  jobDescription?: string;
  url: string;
  logo?: string;
  minPay?: number;
  maxPay?: number;
  payCurrency?: "EUR" | "MYR" | "USD" | "SGD" | "INR" | "RMB";
  isSuffix?: boolean;
  tags?: string[];
  isRemote?: boolean;
  paymentMode?: "Hourly" | "Monthly" | "Yearly";
  type: "Full-Time" | "Part-Time" | "Contract" | "Internship" | "Freelance";
}

const CurrencyChoices = {
  "EUR": {
    symbol: "€",
    name: "Euro"
  },
  "MYR": {
    symbol: "RM",
    name: "Malaysian Ringgit"
  },
  "USD": {
    symbol: "$",
    name: "United States Dollar"
  },
  "SGD": {
    symbol: "S$",
    name: "Singapore Dollar"
  },
  "INR": {
    symbol: "₹",
    name: "Indian Rupee"
  },
  "RMB": {
    symbol: "¥",
    name: "Chinese Yuan"
  }
}

const PaymentMode = {
  "Hourly": "/hr",
  "Monthly": "/mo",
  "Yearly": "/yr"
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
  tags,
  isRemote = false,
  type,
  paymentMode
}) => {
  return (
    <div className={styles.jobItem} onClick={() => window.open(url, "_blank")}>
      <section className={styles.innerJobRect}>
        <div className={styles.typeRow}>
          <div className={styles.logoComponent}>
            { logo ? <Image src={logo} alt="Logo" fill /> : 
              <Texts color="var(--text)" fontSize="sm" weight="bold" className={styles.logoLetter}>
                {companyName.charAt(0)}
              </Texts>
            }
          </div>
        </div>
        <div className={styles.jobCompanyRow} style={{ marginTop: "2rem" }}>
          <Texts color="var(--text-light)" fontSize="xs" >
            {companyName}
          </Texts>
        </div>
        <div className={styles.jobTitleRow} style={{ marginTop: "0.25rem" }}>
          <Texts color="var(--text)" fontSize="lg" >
            {jobTitle}
          </Texts>
        </div>
      </section>
      <section className={styles.innerBottomJobRect}>
        {minPay && !maxPay && payCurrency && (
          <Texts color="var(--text)"  fontSize="sm"  className={styles.jobPay}>
            {CurrencyChoices[payCurrency].symbol}{minPay} {paymentMode && PaymentMode[paymentMode]}
          </Texts>
        )}

        {minPay && maxPay && payCurrency && (
          <Texts color="var(--text)"  fontSize="sm" className={styles.jobPay}>
            {CurrencyChoices[payCurrency].symbol}{minPay} - {CurrencyChoices[payCurrency].symbol}{maxPay} {paymentMode && PaymentMode[paymentMode]}
          </Texts>
        )}

        <Texts color="var(--text-light)" fontSize="xs" >
          {type} {isRemote && "• Remote"}
        </Texts>
      </section>


      {/* Fake Borders for On Hover */}
      <div className={styles.fakeBorderLeft} />
      <div className={styles.fakeBorderRight} />
      <div className={styles.fakeBorderTop} />
      <div className={styles.fakeBorderBottom} />
    </div>
  )
}

export default JobItem;