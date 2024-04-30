"use client";
import React, { FC, useState } from 'react';
import styles from "./Navigation.module.scss";
import { NavigationItems } from './NavigationItems';
import Texts from '../Atoms/Texts';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Select from '../Molecules/Select/Select';
import { usePathname } from "@/app/navigation";
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';

const locales = [
  {
    id: "en",
    name: "EN"
  },
  {
    id: "zh",
    name: "中文"
  }
]

const Navigation: FC = () => {

  const t = useTranslations("Navigation");

  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (locale: string) => {
    router.push(`/${locale}/${pathname}`);
  }

  const locale = useCookies().get("NEXT_LOCALE") || "en";

  const [ selected, setSelected ] = useState<string>("home");

  return (
    <section className={styles.navigationBar}>
      <section className={styles.navItems}>
        { NavigationItems.map((item) => {

          if(item.id === "home") return (
            <Link key={item.id} href={item.link} className={styles.navItem} style={{
              marginRight: "auto",
            }}>
              <Image src="/images/logo.svg" alt="Logo" width={30} height={30} style={{
                fill: "var(--background)",
              }} />
            </Link>
          )

          return (
            <Link key={item.id} href={item.link} className={styles.navItem}>
              <div className={styles.pseudoNavItem} />
              <Texts color={selected === item.id ? "var(--text)" : "var(--text-light)"} fontSize="sm" className={styles.navItemText}>
                <Texts color="var(--foreground)" fontSize="sm" className={styles.navItemText}>&#47;&#47;&nbsp;&nbsp;</Texts>{t(item.id)}
              </Texts>
            </Link>
          )
        })}

        <Select options={locales} value={locale} onChange={(locale: string) => handleChange(locale)}/>
      </section>
    </section>
  )
}

export default Navigation;