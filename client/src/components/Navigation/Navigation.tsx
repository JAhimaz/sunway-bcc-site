"use client";
import React, { FC, useTransition } from 'react';
import styles from "./Navigation.module.scss";
import { NavigationItems, locales } from './NavigationItems';
import Texts from '../Atoms/Texts';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Select from '../Molecules/Select/Select';
import { usePathname } from "@/components/navigation";
import { useParams } from "next/navigation";
import { useRouter } from '@/components/navigation';
import { useCookies } from 'next-client-cookies';
import { useLocale } from 'next-intl';
import { ConnectKitButton } from 'connectkit';
import { Avatar } from 'connectkit';
import { Icon } from '@/utils/Icons';

const Navigation: FC = () => {

  const t = useTranslations("Navigation");

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
            <Link key={item.id} href={item.link} target={item.newTab ? "_blank" : "_self"} className={styles.navItem}>
              <div className={styles.pseudoNavItem} />
              <Texts color={item.highlight ? "var(--highlight)": "var(--text-light)"} fontSize="sm" className={styles.navItemText}>
                <Texts color="var(--foreground)" fontSize="sm" className={styles.navItemText}>&#47;&#47;&nbsp;&nbsp;</Texts>{t(item.id)} {item.highlight ? "✨" : ""}
              </Texts>
            </Link>
          )
        })}

        <Select options={locales} value={locale} onChange={(locale: string) => handleChange(locale)}/>

        <ConnectKitButton.Custom>
          {({ show, ensName, address, isConnected, truncatedAddress }) => {
            return (
              isConnected && address ? (
                <>
                  <Link href="/profile">
                    <span className={styles.connectButton}>
                      <Avatar address={address} size={15} />
                      <Texts color="var(--text)">{ensName ?? truncatedAddress}</Texts>
                    </span>
                  </Link>
                  <span className={styles.disconnectButton} onClick={show}>
                    <Icon icon="exit" />
                  </span>
                </>
              ) : (
                <span className={styles.connectButton} onClick={show}>
                  <Texts color="var(--text)" fontSize="xs">{t("connect-button")}</Texts>
                </span>
              )

            );
          }}
        </ConnectKitButton.Custom>
      </section>
    </section>
  )
}

export default Navigation;