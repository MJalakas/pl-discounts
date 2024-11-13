"use client";
import SearchIcon from "@/app/assets/SearchIcon.svg";
import Image from "next/image";
import CloseButton from "./CloseButton";

export default function CustomSearch({ search, handleSearchChange, handleSearchClear, onSearchButtonClick }) {
    return (
        <div className="flex h-10 w-[284px] justify-between items-center bg-white rounded-md border-[#D6D2E1] border text-sm/4 text-[#626262] text-left">
            <input
                type="text"
                placeholder="Discount name, code"
                className="h-full w-full bg-transparent px-2 placeholder:text-sm placeholder:text-[#626262]"
                onChange={handleSearchChange}
                value={search}
            />
            <div className="w-fit h-fit border-r border-r-[#D6D2E1]">
                <CloseButton onClick={handleSearchClear} />
            </div>

            <button className="h-full flex items-center p-3 hover:invert" onClick={onSearchButtonClick}>
                <Image src={SearchIcon} alt="Search icon" className="min-w-4" />
            </button>
        </div>
    );
}
