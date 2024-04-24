"use client";
import Texts from "../Atoms/Texts";
import LinkButton from "../Molecules/LinkButton";
import styles from "./Homepage.module.scss";

const Homepage = () => {

  const headline = "Sunway Blockchain Club";

  return (
    <section className={styles.main}>
      <section className={styles.header}>
        <Texts color="var(--text-light)" fontSize="xs">
          &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs">NURTURING</Texts> THE NEXT GENERATION INTO BLOCKCHAIN
        </Texts>
        <span className={styles.headline}>
          {headline.split("").map((char, index) => (
            <Texts key={index} color="var(--text)" fontSize="headline" className={styles.headlineChar} style={{
              animationDelay: `${index * 0.075}s`
            }}>{char}</Texts>
          ))}
        </span>
      </section>
      <section style={{
        width: '10%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <LinkButton href="#">
          Test Button
      </LinkButton>
      </section>
    </section>
  );
}

export default Homepage;