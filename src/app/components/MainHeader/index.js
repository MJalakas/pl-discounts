import Image from "next/image";
import Link from "next/link";
import MainHeaderNav from "@/app/components/MainHeader/Nav";
import MainHeaderUser from "@/app/components/MainHeader/User";
import Logo from "@/app/assets/logo.svg";

export default function MainHeader() {
    return (
        <header className="w-full pt-8 px-8 flex md:justify-start justify-center bg-white max-h-[5rem] custom-drop-shadow">
            <div className="flex mb-6">
                <Link href="/" className="min-h-[26px] min-w-[111px] mx-2">
                    <Image src={Logo} alt="Piletilevi" width={111} height={26} />
                </Link>
            </div>
            <MainHeaderNav />
            <MainHeaderUser />
        </header>
    );
}
