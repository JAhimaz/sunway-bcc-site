"use client";
import React, { FC, useState } from 'react';
import styles from "./Navigation.module.scss";
import { NavigationItems } from './NavigationItems';
import Texts from '../Atoms/Texts';
import Link from 'next/link';
import Image from 'next/image';

const Navigation: FC = () => {

  const [ selected, setSelected ] = useState<string>("home");

  return (
    <section className={styles.navigationBar}>
      <section className={styles.navItems}>
        { NavigationItems.map((item) => {

          if(item.id === "home") return (
            <Link key={item.id} href={item.link} className={styles.navItem} style={{
              marginRight: "auto",
            }}>
              <Image src="/logo.svg" alt="Logo" width={30} height={30} style={{
                fill: "var(--background)",
              }} />
            </Link>
          )

          return (
            <Link key={item.id} href={item.link} className={styles.navItem}>
              <div className={styles.pseudoNavItem} />
              <Texts color={selected === item.id ? "var(--text)" : "var(--text-light)"} fontSize="sm" className={styles.navItemText}>
                <Texts color="var(--foreground)" fontSize="sm" className={styles.navItemText}>&#47;&#47;&nbsp;&nbsp;</Texts>{item.title}
              </Texts>
            </Link>
          )
        })}
      </section>
    </section>
  )
}

export default Navigation;