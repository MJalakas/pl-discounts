import "./globals.css";
import { Roboto } from "next/font/google";

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
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
    );
}
