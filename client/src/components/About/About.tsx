"use client";
import Image from 'next/image';
import styles from './About.module.scss';
import Texts from '../Atoms/Texts';
import { useTranslations } from 'next-intl';
import LinkButton from '../Molecules/LinkButton/LinkButton';

const About = () => {

  const t = useTranslations("About");

  return (
    <section className={styles.main}>
      <section className={styles.segment}>
        <div className={styles.imageContainer}>
          <Image src="/images/homepage/about.webp" alt="Orientation with SBCC" fill className={styles.image} />
          <div className={styles.overlay} />
        </div>
      </section>
      <section className={styles.segment} style={{
        boxSizing: 'border-box',
      }}>
        <Texts fontSize='lg' color="var(--text)" className={styles.aboutText}>
          {t("about-1")}
          <Texts fontSize='lg' color="var(--text-light)" className={styles.aboutText}>
            &nbsp;{t("about-2")}
          </Texts>
        </Texts>
        <div className={styles.rightSect}>
          <LinkButton href="https://docs.google.com/forms/d/e/1FAIpQLScALDHl6vfTgpQWs0GaherrJZbIRfrZOFSzg93qSx9fGqnViQ/viewform">JOIN THE CLUB</LinkButton>
        </div>
      </section>
    </section>
  )
}

export default About;