import { FaArrowRight, FaPowerOff, FaCheck, FaGlobeAsia, FaChalkboardTeacher } from "react-icons/fa";
import { AiFillInstagram, AiFillCloseSquare } from "react-icons/ai";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoLogoDiscord, IoPerson } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsQrCode, BsFillMegaphoneFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { PiCalendarCheckBold } from "react-icons/pi";
import { MdDelete, MdGroups } from "react-icons/md";
import { CSSProperties, FC } from "react";

const IconsIndex = {
  arrowRight: FaArrowRight,
  person: IoPerson,
  menu: GiHamburgerMenu,
  qrCode: BsQrCode,
  bookmarked: FaBookmark,
  bookmark: FaRegBookmark,
  power: FaPowerOff,
  exit: ImExit,
  check: FaCheck,
  calendar: PiCalendarCheckBold,
  delete: MdDelete,
  close: AiFillCloseSquare
};

const EventIndex = {
  external: FaGlobeAsia,
  major: MdGroups,
  talk: BsFillMegaphoneFill,
  workshop: FaChalkboardTeacher
}

const SocialsIndex = {
  instagram: AiFillInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  discord: IoLogoDiscord
}

const Index = {
  ...EventIndex,
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