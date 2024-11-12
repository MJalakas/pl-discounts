import "@/app/globals.css";
import { Roboto } from "next/font/google";
import MainHeader from "@/app/components/MainHeader";

export const metadata = {
    title: "Piletilevi Back-office",
    description: "Only for demo purposes.",
};

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${roboto.className} text-[#1A1A1A]`}>
            <body className="w-full h-full min-h-[100dvh]">
                <MainHeader />
                <main className="bg-[#E3E3E3] w-full h-full">{children}</main>
            </body>
        </html>
    );
}
