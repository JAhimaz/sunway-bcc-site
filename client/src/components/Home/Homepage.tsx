"use client";
import { useTranslations } from 'next-intl'
import About from "../About/About";
import Texts from "../Atoms/Texts";
import Seperator from "../Molecules/Seperator/Seperator";
import Partners from "@/components/Home/Partners/Partners";
import GridHoverBox from "./GridHoverBox/GridHoverBox";
import styles from "./Homepage.module.scss";
import HomeGallery from '@/components/Home/HomeGallery/HomeGallery';
import HomeGalleryMobile from '@/components/Home/HomeGallery/HomeGalleryMobile/HomeGalleryMobile';
import SocialBox from '@/components/Home/SocialBox/SocialBox';
import Numbers from './Numbers/Numbers';
import Ethos from './Ethos/Ethos';
import EventGrid from './EventGrid/EventGrid';

const Homepage = () => {

  const t = useTranslations("Main")

  const headline = t("title");

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
        <Seperator text={t("about-sep")} />
        <About />
        <Seperator text={t("numbers-sep")} />
        <Numbers />
        <Seperator text={t("events-sep")} />
        <EventGrid />
        <Seperator text={t("ethos-sep")} />
        <Ethos />
        <Seperator text={t("workwith-sep")} />
        <Partners />
        <Seperator/>
        <HomeGallery />
        <HomeGalleryMobile />
        <Seperator text={t("socials-sep")} />
        <SocialBox />
      </section>
    </section>
  );
}

export default Homepage;