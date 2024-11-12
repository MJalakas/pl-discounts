"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { path: "/", label: "Back office" },
    { path: "/reports", label: "Reports" },
    { path: "/help", label: "Help" },
];

const NavButton = ({ path, label }) => {
    // Use the current path to highlight the active link
    const currentPath = usePathname();
    const isActive = currentPath === path;

    return (
        <li className="flex flex-col justify-between h-full">
            <Link href={path} className={isActive ? "text-purple" : ""}>
                {label}
            </Link>
            {isActive && <span className="w-full h-1 bg-purple rounded" />}
        </li>
    );
};

export default function MainHeaderNav() {
    return (
        <nav className="w-full px-14 font-bold text-lg">
            <ul className="flex gap-11 h-full">
                {navLinks.map((navLink) => (
                    <NavButton key={navLink.path} path={navLink.path} label={navLink.label} />
                ))}
            </ul>
        </nav>
    );
}
