"use client";
import Texts from "../Atoms/Texts";
import LinkButton from "../Molecules/LinkButton/LinkButton";
import Seperator from "../Molecules/Seperator/Seperator";
import Partners from "../Partners/Partners";
import GridHoverBox from "./GridHoverBox/GridHoverBox";
import styles from "./Homepage.module.scss";

const Homepage = () => {

  const headline = "Sunway Blockchain Club _";

  return (
    <section className={styles.main}>
      <section className={styles.header}>
        <GridHoverBox />
        <Texts color="var(--text-light)" fontSize="xs">
          &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>NURTURING</Texts> THE NEXT GENERATION INTO BLOCKCHAIN
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
        <Seperator text="[ ABOUT SBCC ]" />
        <Partners />
        <Seperator text="[ WE WORKED WITH ]" />
      </section>
    </section>
  );
}

export default Homepage;