"use client"
import { useTranslations } from "next-intl"
import styles from "./Profile.module.scss"
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox"
import Texts from "../Atoms/Texts"
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi"
import Loader from "../Loader/Loader"

const Profile = () => {

  const t = useTranslations("Profile")
  const headline = t("title");

  const { address, isConnected } = useAccount();

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

        <section className={styles.mainSection}>

        { isConnected && address ? (
          <section>

            

            <ConnectKitButton.Custom>
            {({ show, ensName, address }) => {
              return (
                <span onClick={show}>{ensName ?? address} Disconnect</span>
              );
            }}
            </ConnectKitButton.Custom>
          </section>
        ) : (
          <section className={styles.connectSection}>
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <span className={styles.connectButton} onClick={show}>
                    <Texts color="var(--text)" fontSize="md">{t("connect-button")}</Texts>
                  </span>
                );
              }}
            </ConnectKitButton.Custom>
            <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
              {t("connect-1")}
              <Texts color="var(--text" fontSize="xs">{t("connect-2")}</Texts>
              {t("connect-3")}
            </Texts>
          </section>          
        )}
        
        </section>
      </section>
    </section>
  )
}

export default Profile