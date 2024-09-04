import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import './globals.css'
import { ReactNode } from 'react';
import { CookiesProvider } from 'next-client-cookies/server';

type Props = {
  children: ReactNode;
  params: { locale: string };
};
export const metadata: Metadata = {
  title: "Sunway Blockchain Club",
  description: "The Sunway Blockchain Club is a Sunway student-led organization that aims to educate and nurture the next generation into blockchain, crypto and Web3 Technologies. Whether they aim to be Developers, Fintech, Finance, Designers or even passionate investors. We guide them to achieve their goals.",
  applicationName: "Sunway Blockchain Club",
  keywords: ["Sunway", "Blockchain", "Club", "Crypto", "Web3", "Technology", "Fintech", "Finance", "Designers", "Investors", "Cryptocurrency", "NFT", "Metaverse", "DAO", "DeFi", "Blockchain Club", "Sunway", "Sunway College", "Sunway University"],
  authors: [{ name: "Sunway Blockchain Club", url: "https://sunwayblockchain.com/"}, { name: "Joshua Ahimaz", url: "https://joshuaahimaz.com/"}],
  creator: "Joshua Ahimaz",
  metadataBase: new URL("https://sunwayblockchain.com/"),
  publisher: "Sunway Blockchain Club",
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'zh': '/zh',
      'bm': '/bm'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    }
  },
  openGraph: {
    siteName: "Sunway Blockchain Club",
    url: "https://sunwayblockchain.com/",
    images: ['/images/logoMETA.png'],
    type: "website",
    title: "Sunway Blockchain Club",
    locale: "en",
    description: "The Sunway Blockchain Club is a Sunway student-led organization that aims to educate and nurture the next generation into blockchain, crypto and Web3 Technologies. Whether they aim to be Developers, Fintech, Finance, Designers or even passionate investors. We guide them to achieve their goals.",
  },
  twitter: {
    card: "summary",
    title: "Sunway Blockchain Club",
    creator: "@SunwayBCC",
    description: "The Sunway Blockchain Club is a Sunway student-led organization that aims to educate and nurture the next generation into blockchain, crypto and Web3 Technologies. Whether they aim to be Developers, Fintech, Finance, Designers or even passionate investors. We guide them to achieve their goals.",
    images: ['/images/logoMETA.png'],
  }
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "zh", "bm"].map((locale) => ({ locale }));
}

export default async function PageLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </NextIntlClientProvider>
  )
}
