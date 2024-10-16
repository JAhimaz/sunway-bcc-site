import { FaArrowRight } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoLogoDiscord, IoPerson } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsQrCode } from "react-icons/bs";

import { CSSProperties, FC } from "react";

const IconsIndex = {
  arrowRight: FaArrowRight,
  person: IoPerson,
  menu: GiHamburgerMenu,
  qrCode: BsQrCode 
};

const SocialsIndex = {
  instagram: AiFillInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  discord: IoLogoDiscord
}

const Index = {
  ...IconsIndex,
  ...SocialsIndex
}

export type IconName = keyof typeof Index | "none";

type Props = {
  icon: IconName
  className?: string
  style?: CSSProperties
  onClick?: () => void;
}

export const Icon: FC<Props> = ({ icon, className, style, onClick }) => {
  if (icon == "none") {
    return null;
  }

  const Icon = Index[icon];
  return (
    <Icon className={className} style={style} onClick={onClick} />
  )
}