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
  description: "The Sunway Blockchain Club is a student-led organization that aims to educate and nurture the next generation into blockchain.",
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
