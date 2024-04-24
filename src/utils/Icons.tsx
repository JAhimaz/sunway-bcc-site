import { FaArrowRight } from "react-icons/fa";

import { CSSProperties, FC } from "react";

const IconsIndex = {
  arrowRight: FaArrowRight
};

const Index = {
  ...IconsIndex,
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