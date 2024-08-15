import {Inter} from "next/font/google";
import "./globals.css";
import AppRoot from "@/contentPages/AppRoot";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Responsible AI Toolkit",
    description: "By Beyond 12",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRoot>
            {children}
        </AppRoot>
        </body>
        </html>
    );
}
