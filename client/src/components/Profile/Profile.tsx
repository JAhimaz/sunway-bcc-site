"use client"
import { useTranslations } from "next-intl"
import styles from "./Profile.module.scss"
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox"
import Texts from "../Atoms/Texts"
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi"
import Loader from "../Loader/Loader"
import Stamps from "./Stamps/Stamps"
import QRCode from "react-qr-code"
import { use, useEffect, useState } from "react"
import { ExpToLevel } from "@/utils/ExpToLevel"
import GetUser, { User } from "@/libs/@server/user/GetUser"
import { Scanner } from "@yudiel/react-qr-scanner"

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

  useEffect(() => {
    if(address && address.toString() !== userDetails.address) {
      // Fetch user details
      GetUser(address).then((data) => {
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
  }, [address, userDetails.address])

  return (
    <section className={styles.main}>

      <section className={styles.header}>
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
        <section className={styles.levelSection}>
          { userDetails.address && isConnected ? (
            <Texts color="var(--text)" fontSize="xl" weight="bold" className={styles.levelText}>Lv. {ExpToLevel(userDetails.exp).level}</Texts> 
          ) : (
            <Loader />
          )}
          <div className={styles.progressSection}>
            <Texts fontSize="sm" color={'var(--background)'} style={{
              position: "absolute",
              zIndex: 10,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}>
              {userDetails.exp} / {ExpToLevel(userDetails.exp).expRequired}
            </Texts>
            <progress className={styles.progressBar} value={ExpToLevel(userDetails.exp).remainingExpScaled} />
          </div>
        </section>
        { userDetails.isAdmin && (
        <section className={styles.adminSection}>
          <div className={styles.scannerBox}>
            <Scanner onScan={(data) => {
              setScanDetails({
                userAddress: data[0].rawValue,
                date: new Date(),
              })
            }} styles={{
              container: {
                width: "400px",
                height: "400px",
                border: 'none !important',
              },
              video: {
                width: "100%",
                height: "100%",
              }
            }}
            />
          </div>
          <section>
            <input type="text" 
              className={styles.scannerInput} 
              placeholder={"0xF......."} 
              value={scanDetails?.userAddress} />
            <div>Submit</div>
          </section>
        </section>
        ) }
        <section className={styles.mainSection}>
        { address && isConnected ? (
          <>
            <section className={styles.profileSection}>
              { address && isConnected ? (
                <>
                  <div className={styles.qr}>
                      <QRCode value={address.toString()} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                  </div>
                  <Texts color="var(--text)" fontSize="xs" className={styles.address}>{address}</Texts>
                  <ConnectKitButton.Custom>
                  {({ show }) => {
                    return (
                      <div className={styles.disconnectButton} onClick={show}>
                        <Texts color="var(--text)" fontSize="md" className={styles.connectButton}>
                          {t("disconnect")}
                        </Texts>
                      </div>
                    )
                  }}
                  </ConnectKitButton.Custom>
                </>
              ) : (
                <Loader />
              )}
            </section>   
            <section className={styles.stampSection}>
              <Stamps stamps={userDetails.stamps}/>
            </section>   
          </>
        ) : (
          <section style={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}>
            <section style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "3rem",
              // blur
              filter: "blur(2px)",
            }}>
              <div style={{
                flex: 1,
                width: "100%",
                height: 400,
                border: "1px solid var(--foreground)",
                borderRadius: '1rem',
              }} />
              <div style={{
                flex: 3,
                width: "100%",
                height: 400,
                border: "1px solid var(--foreground)",
                borderRadius: '1rem',
              }} />
            </section>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              gap: "2rem"
            }}>
              <Loader />
              <div>
              <Texts color="var(--text-light)" fontSize="xs" className={styles.address}>{t("connect-1")}</Texts>
              <Texts color="var(--text)" fontSize="xs" className={styles.address}>{t("connect-2")}</Texts>
              <Texts color="var(--text-light)" fontSize="xs" className={styles.address}>{t("connect-3")}</Texts>
              <Texts color="var(--text)" fontSize="xs" className={styles.address}>{t("connect-4")}</Texts>
              <Texts color="var(--text-light)" fontSize="xs" className={styles.address}>{t("connect-5")}</Texts>
              </div>
            </div>
          </section>
        )}
        </section>
      </section>
    </section>
  )
}

export default Profile