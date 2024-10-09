"use client";
import styles from "./NavigationMobile.module.scss";
import { NavigationItems, locales } from '../NavigationItems';
import Texts from '../../Atoms/Texts';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from "react";
import { Icon } from "@/utils/Icons";
import Select from "@/components/Molecules/Select/Select";
import { usePathname } from "@/components/navigation";
import { useParams } from "next/navigation";
import { useRouter } from '@/components/navigation';
import { useCookies } from 'next-client-cookies';
import { useLocale } from 'next-intl';
import { ConnectKitButton } from "connectkit";

const NavigationMobile = () => {
  
  const t = useTranslations("Navigation");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { set } = useCookies();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (locale: string) => {
  startTransition(() => {
    set("NEXT_LOCALE", locale);

    router.push(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      {pathname, params},
      {locale: locale}
    );
  });
  }

  return (
    <div className={styles.navigationBar}>
      <Link key={NavigationItems[0].id} href={NavigationItems[0].link} className={styles.navItem} style={{
        marginRight: "auto",
      }}>
      <Image src="/images/logo.svg" alt="Logo" width={30} height={30} style={{
          fill: "var(--background)",
        }} />
      </Link>
      <Select options={locales} value={locale} onChange={(locale: string) => handleChange(locale)}/>
      <div className={styles.menuIconContainer}>
        <Icon icon="menu" className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      <div className={styles.navigationMenu} style={{
        display: menuOpen ? "flex" : "none",
      }}>
        { NavigationItems.map((item) => {
          if(item.id === "home") return null;
          return (
            <Link key={item.id}
              href={item.link}
              className={styles.navMenuItem}
              onClick={() => setMenuOpen(false)}
            >
              <Texts fontSize="sm">{t(item.id)}</Texts>
            </Link>
          )
        })}
        <ConnectKitButton.Custom>
          {({ show, ensName, address, isConnected, truncatedAddress }) => {
            return (
              isConnected && address ? (
                <>
                  <Link href="/profile" className={styles.navMenuItem}>
                      <Texts fontSize="sm" color="var(--text)">Profile ({isConnected && (ensName ?? truncatedAddress)})</Texts>
                  </Link>
                  <div onClick={show} className={styles.navMenuItem}>
                    <Texts fontSize="sm" color="var(--text)">Disconnect</Texts>
                  </div>
                </> 
              ) : (
                <span onClick={show} className={styles.navMenuItem}>
                  <Texts color="var(--text)" fontSize="sm">{t("connect-button")}</Texts>
                </span>
              )
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </div>
  )
}

export default NavigationMobile;