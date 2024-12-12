"use client"
import { useTranslations } from "next-intl"
import styles from "./AdminPage.module.scss"
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox"
import Texts from "../Atoms/Texts"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import GetUser, { User } from "@/libs/@server/user/GetUser"
import Loader from "../Loader/Loader"
import Seperator from "../Molecules/Seperator/Seperator"
import { useRouter } from "next/navigation"
import Accordian from "../Molecules/Accordian/Accordian"
import Administrators from "./Administrators/Administrators"
import EventBadges from "./Badges/EventBadges"

const AdminPage = () => {
  const t = useTranslations("Admin")
  const headline = t("title")
  const { address, isConnected } = useAccount()
  const router = useRouter()

  const [userDetails, setUserDetails] = useState<User | null>(null) // Initialize as null
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      if (address && isConnected) {
        setLoading(true)
        const data = await GetUser(address)
        setUserDetails(data)
        setLoading(false)
      } else {
        setUserDetails(null)
        setLoading(false)
      }
    }
    fetchUserDetails()
  }, [address, isConnected])

  // Redirect if not loading and user is not an admin
  useEffect(() => {
    if (!loading && userDetails && !userDetails.isAdmin) {
      router.push("/")
    }
  }, [loading, userDetails, router])

  if (loading) {
    return <Loader />
  }

  if (userDetails && userDetails?.isAdmin  && userDetails?.key) {
    return (
      <section className={styles.main}>
        <GridHoverBox />
        <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
          &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>{t("headline-1")}</Texts>{t("headline-2")}
        </Texts>
        <span className={styles.headline}>
          {headline.split("").map((char, index) => (
            <Texts
              key={index}
              color="var(--text)"
              fontSize="headline"
              className={styles.headlineChar}
              style={{
                animationDelay: `${index * 0.075}s`
              }}
            >
              {char}
            </Texts>
          ))}
        </span>
        <Seperator text="[ADMIN PANEL]" />
        <section className={styles.adminDashboard}>
          <Accordian title="Administrators">
            <Administrators userDetails={userDetails} />
          </Accordian>
          <Accordian title="Event Badges">
            <EventBadges userDetails={userDetails} />
          </Accordian>
          <Accordian title="Users" disabled>
            <Texts color="var(--text-light)">Work in Progress</Texts>
          </Accordian>
          <Accordian title="Jobs Management" disabled>
            <Texts color="var(--text-light)">Work in Progress</Texts>
          </Accordian>
          <Accordian title="Event Listings" disabled>
            <Texts color="var(--text-light)">Work in Progress</Texts>
          </Accordian>
          <Accordian title="Statistics Management" disabled>
            <Texts color="var(--text-light)">Work in Progress</Texts>
          </Accordian>
          <Accordian title="Images" disabled>
            <Texts color="var(--text-light)">Work in Progress</Texts>
          </Accordian>
          <Accordian title="Admin Commands (WARNING DO NOT TOUCH IF YOU'RE NOT SURE)" disabled>
            <Texts color="var(--text-light)">Work in Progress</Texts>
          </Accordian>
        </section>
      </section>
    )
  }

  return null // Renders nothing if loading is done and user is not admin
}

export default AdminPage
