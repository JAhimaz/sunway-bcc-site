"use client"

import styles from "./Community.module.scss";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import { Icon } from "@/utils/Icons";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { useRouter } from "next/navigation";
import { User } from "@/libs/@server/user/GetUser";
import GetTopUsers from "@/libs/@server/user/GetTopUsers";
import { Avatar } from 'connectkit';
import Loader from "../Loader/Loader";
import { TruncateAddress } from "@/utils/TruncateAddress";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ExpToLevel } from "@/utils/ExpToLevel";

const Community = () => {

  const t = useTranslations("Community");
  const headline = t("title");

  const { address } = useAccount();

  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [loadingTopUsers, setLoadingTopUsers] = useState<boolean>(false);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);

  const SearchForUser = (passedAddress?: string) => {
    if(!search && !passedAddress) return;

    if(!passedAddress && !isAddress(search)) {
      setError(true);
      return;
    }

    if(passedAddress && !isAddress(passedAddress)) {
      setError(true);
      return;
    }

    if(search === address || (passedAddress && passedAddress === address)) {
      router.push("/profile");
      return;
    }

    // Redirect to user profile
    if(passedAddress) {
      router.push(`/community/${passedAddress}`);
      return;
    }
    
    router.push(`/community/${search}`);
  }

  useEffect(() => {
    // Get top users
    setLoadingTopUsers(true);
    GetTopUsers().then((data) => {
      setTopUsers(data);
      setLoadingTopUsers(false);
    }).catch((err) => {
      console.log(err);
      setLoadingTopUsers(false);
    })
  }, [])

  return (
    <section className={styles.main}>
      <section className={styles.header}>
        <GridHoverBox />
      </section> 
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {headline.split("").map((char, index) => {
        return (
          <Texts key={index} color="var(--text)" weight="bold" className={styles.subheader} style={{
            animationDelay: `${index * 0.075}s`
          }}>
            {char === " " ? "\u00A0" : char}
          </Texts>
        )
      })}
      </div>
      <section style={{
        position: "relative",
        overflow: "hidden",
      }} className={styles.searchSection}>
        <Icon icon="search" className={styles.searchIcon} onClick={() => SearchForUser()} />
        {/* Make it where if I click enter it will search */}
        <input type="text" className={styles.search} placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
        style={{
          borderColor: error ? "var(--error)" : "var(--foreground)"
        }}
        onChange={(e) => {
          setError(false);
          setSearch(e.target.value)
        }}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              SearchForUser();
            }
          }}
        />
      </section>
      <section className={styles.topUsers}>
          {loadingTopUsers ? (
            <Loader />
          ) : (
            topUsers.map((user, index) => 
              <div className={styles.topUser} key={index} 
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => {
                SearchForUser(user.address);
              }}>
                <Avatar address={user.address as `0x${string}`} size={25} />
                <Texts color="var(--text-light)" weight="bold">
                  {user.name}<br />
                  <Texts color="var(--text-light)" weight="normal">Lv. {ExpToLevel(user.exp).level}</Texts>
                </Texts>
                <Icon icon="arrowRight" className={styles.arrow} />
              </div>
            )
          )}
        </section>
    </section>
  )
}

export default Community;