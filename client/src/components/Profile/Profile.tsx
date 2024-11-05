"use client"
import { useTranslations } from "next-intl"
import styles from "./Profile.module.scss"
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox"
import Texts from "../Atoms/Texts"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import GetUser, { User } from "@/libs/@server/user/GetUser"
import { Avatar } from 'connectkit';
import Loader from "../Loader/Loader"
import Stamps from "./Stamps/Stamps"
import CircularProgress from "../Molecules/CircularProgress/CircularProgress"
import { ExpToLevel } from "@/utils/ExpToLevel"

type ScannedDetails = {
  userAddress: string,
  date: Date,
}

const Profile = () => {

  const t = useTranslations("Profile")
  const headline = t("title");

  const { address, isConnected } = useAccount();

  const [userDetails, setUserDetails] = useState<User>({
    _id: "",
    name: "",
    address: "",
    createdAt: "",
    exp: 0,
    isAdmin: false,
    stamps: [],
    updatedAt: "",
    version: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      // Fetch user details
    setLoading(true)
    if(address && isConnected) {
      GetUser(address).then((data) => {
        setUserDetails(data)
        console.log(ExpToLevel(data.exp))
        setLoading(false)
      })
    }

    if(!address && !isConnected) {
      setLoading(false)
    }

    if(!address) {
      setUserDetails({
        _id: "",
        name: "",
        address: "",
        createdAt: "",
        exp: 0,
        isAdmin: false,
        stamps: [],
        updatedAt: "",
        version: 0,
      })
    }
  }, [address, isConnected])

  return (
    <section className={styles.main}>
      <section className={styles.header}>
        <GridHoverBox />
      </section> 

      <section style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}>
        { loading && <Loader /> }
        { !loading && !isConnected && (
          <section>
            Please Connect Your Wallet
          </section>
        )}
      </section>

      { isConnected && address && userDetails._id && (
        <section className={styles.container}>
          <section className={styles.profile}>
            <CircularProgress size={100} progress={ExpToLevel(userDetails.exp).remainingExpScaled} strokeWidth={4} style={{
              position: "absolute",
              top: '-75px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-90deg)',
              zIndex: 100,
            }}/>

            <Texts fontSize="sm" color="var(--text-light)" style={{
              position: "absolute",
              top: '-25px',
              right: 0,
              zIndex: 100,
            }}>{`Lv. ${ExpToLevel(userDetails.exp).level}`}</Texts>

            <div id="profile_logo_outer"className={styles.profileLogoOuter}>
              <Avatar address={address} size={85}/>
            </div>
            <section className={styles.profileInner}>
              <section className={styles.details}>
                <Texts fontSize="lg" color="var(--text)">{userDetails.name}</Texts>
                <Stamps stamps={userDetails.stamps} />
              </section>
              <section className={styles.subDetails}>
                <Texts fontSize="xs" color="var(--foreground)">{address}</Texts>
              </section>
            </section>
          </section>
          { userDetails.stamps.length === 6 && (
            <button id="claim_cert" className={styles.button} disabled={userDetails.stamps.length < 6}>
              Claim Certificate
            </button>
          )}
        </section>
      )}
    </section>
  )
}

export default Profile