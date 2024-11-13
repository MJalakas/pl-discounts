"use client";
import CloseIcon from "@/app/assets/CloseIcon.svg";
import Image from "next/image";

export default function CloseButton({ onClick }) {
    return (
        <button onClick={onClick} className="h-full flex items-center p-3 hover:invert">
            <Image src={CloseIcon} alt="Close icon" className="min-w-4" />
        </button>
    );
}
