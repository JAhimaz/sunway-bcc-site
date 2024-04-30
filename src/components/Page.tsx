"use client";
import { FC } from "react";
import Navigation from "./Navigation/Navigation"

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
      { children }
  </main>
  )
}

export default Page;