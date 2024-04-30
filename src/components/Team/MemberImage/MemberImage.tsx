"use client";
import { MemberProp } from "@/utils/Members";
import styles from "./MemberImage.module.scss";
import { useTranslations } from "next-intl";
import { FC } from "react";

const MemberImage: FC<MemberProp> = ({
  name,
  role,
  image,
  imageAlt
}) => {
  return (
    <div>
      {name}
    </div>
  )
}

export default MemberImage;