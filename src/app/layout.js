import "@/app/globals.css";
import { roboto } from "@/app/fonts";
import MainHeader from "@/app/components/MainHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
    title: "Piletilevi Back Office",
    description: "Only for demo purposes.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${roboto.className} text-[#1A1A1A] bg-[#F5F5F7]`}>
            <body className="w-full h-[100dvh] min-h-[100dvh]">
                <MainHeader />
                {/* 5rem in calc is the header height. This way main content will always take up the rest of the screen without a scrollbar by default. */}
                <main className="flex flex-col gap-8 px-32 py-4 w-full min-h-[calc(100%-5rem)] ">
                    <Breadcrumbs />
                    {children}
                </main>
            </body>
        </html>
    );
}
