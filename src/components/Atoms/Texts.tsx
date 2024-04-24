"use client";
import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

type TextsProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  color?: string;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "headline";
  className?: string;
  style?: CSSProperties;
  weight?: "normal" | "bold";
}

const Texts: FC<TextsProps> = ({ children, color, fontSize, className, style, weight }) => {
  return (
    <span 
    className={className}
    style={{
      color, 
      fontSize: fontSize === "xs" ? "1rem" : // 12px
                fontSize === "sm" ? "1.25rem" : // 16px
                fontSize === "md" ? "1.5rem" : // 20px
                fontSize === "lg" ? "2rem" : // 32px
                fontSize === "xl" ? "4rem" : // 64px
                fontSize === "headline" ? "6rem" : "1rem", // 96px
      fontWeight: weight,
      ...style,
    }}
    >{children}</span>
  );
}

export default Texts;