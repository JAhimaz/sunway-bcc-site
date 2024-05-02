"use client";
import { FC } from "react";
import Navigation from "./Navigation/Navigation"
import NavigationMobile from "./Navigation/NavigationMobile/NavigationMobile";

type PageProps = {
  children: React.ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {

  return (
  <main style={{
    minHeight: "100vh",
    marginBottom: '2rem'
  }}>
      <Navigation />
      <NavigationMobile />
      { children }
  </main>
  )
}

export default Page;