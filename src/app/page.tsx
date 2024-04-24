import Navigation from "@/components/Navigation/Navigation";
import styles from "./page.module.scss";
import Homepage from "@/components/Home/Homepage";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <Homepage />
    </main>
  );
}
