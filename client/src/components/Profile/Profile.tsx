"use client"
import { useTranslations } from "next-intl"
import styles from "./Profile.module.scss"
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox"
import Texts from "../Atoms/Texts"
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount } from "wagmi"
import Loader from "../Loader/Loader"
import Stamps from "./Stamps/Stamps"
import QRCode from "react-qr-code"
import { use, useEffect, useState } from "react"
import { ExpToLevel } from "@/utils/ExpToLevel"
import GetUser, { User } from "@/libs/@server/user/GetUser"
import { Scanner } from "@yudiel/react-qr-scanner"
import { StringToGradient } from "@/utils/GradientGenerator"
import { TruncateAddress } from "@/utils/TruncateAddress"
import { GenGradient } from "@/utils/RandomGradient"
import { Icon } from "@/utils/Icons"
import Seperator from "../Molecules/Seperator/Seperator"

type ScannedDetails = {
  userAddress: string,
  date: Date,
}

const tiltEffectSettings = {
  max: 5, // max tilt rotation (degrees (deg))
  perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
  scale: 1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
  speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
};

const Profile = () => {

  const t = useTranslations("Profile")
  const headline = t("title");

  const { address, isConnected } = useAccount();

  const [userDetails, setUserDetails] = useState<User>({
    _id: "",
    address: "",
    createdAt: "",
    exp: 0,
    isAdmin: false,
    stamps: [],
    updatedAt: "",
    version: 0,
  })

  const [scanDetails, setScanDetails] = useState<ScannedDetails | undefined>(undefined);
  const [scanner, setScanner] = useState(false);
  const [showQR, setShowQR] = useState(false);



  useEffect(() => {
      // Fetch user details
    if(address){
      GetUser(address).then((data) => {
        console.log("HEy")
        setUserDetails(data)
      })
    }

    if(!address) {
      setUserDetails({
        _id: "",
        address: "",
        createdAt: "",
        exp: 0,
        isAdmin: false,
        stamps: [],
        updatedAt: "",
        version: 0,
      })
    }
  }, [address])

  return (
    <section className={styles.main}>
      <section className={styles.header}>
        <GridHoverBox />
        <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
          &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>{t("headline-1")}</Texts>{t("headline-2")}
        </Texts>
        <span className={styles.headline}>
          { (isConnected && address && userDetails.address) ? (
            (TruncateAddress(userDetails.address)).split("").map((char, index) => {
              return (
                <Texts key={index} color="var(--text)" fontSize="headline" className={styles.headlineChar} style={{
                  animationDelay: `${index * 0.075}s`
                }}>
                  {char}
                </Texts>
              )
            })
          ) : (
            headline.split("").map((char, index) => {
              return (
                <Texts key={index} color="var(--text)" fontSize="headline" className={styles.headlineChar} style={{
                  animationDelay: `${index * 0.075}s`
                }}>
                  {char}
                </Texts>
              )
            })
          )}

        </span>

        <Seperator text={"[ PROFILE ]"} />
        
        <section id="profile-sect-container" className={styles.container}>
          { (isConnected && address && userDetails.address) ? (
            <section id="profile-section" className={styles.profileContainer}>
            
            </section>
          ) : (
            <div>Please Connect your wallet</div>
          )}
        </section>
      </section>
    </section>
  )
}

export default Profile