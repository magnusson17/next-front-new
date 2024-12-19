import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import "@/assets/css/reset.css"
import '@/assets/css/root_vars.css'
import "@/assets/css/import_tw.css"
import Header from "@/components/layout/Header";

export const metadata = {
    title: "Next front, Drupal proj",
    description: "Generated by Next front, Drupal proj",
    robots: "noindex, nofollow",
};

// con l'uso di [locale] le pagine dentro tale folder sono in automatico dynamics
// voglio renderle statiche (SSG), uso quanto segue
export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({ children, params: {locale} }) {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale)) {notFound();}
 
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Header lang={locale} />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
