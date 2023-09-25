import "./globals.css";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Classtime!",
};

const league = League_Spartan({
    weight: "400",
    subsets: ["latin"],
});
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
            <body className={league.className}>{children}</body>
        </html>
    );
}
