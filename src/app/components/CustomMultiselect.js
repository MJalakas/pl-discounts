"use client";
import { useState } from "react";
import DropdownArrow from "@/app/assets/DropdownArrow.svg";
import Image from "next/image";
import useOuterClick from "@/app/hooks/useOuterClick";

export default function CustomMultiselect({ placeholder, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOptions = options.filter((option) => option.selected).map((option) => option.name);
    const innerRef = useOuterClick((e) => {
        setIsOpen(false);
    });

    return (
        <div className="relative w-full max-w-[284px]" ref={innerRef}>
            <div
                className="flex justify-between items-center bg-white rounded-md border-[#D6D2E1] border px-4 py-3 w-full text-sm text-[#626262] leading-4 text-left hover:cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Display the placeholder or if selected, create a string of the options to display. */}
                {selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder}
                <Image src={DropdownArrow} alt="Dropdown arrow" />
            </div>
            {isOpen && (
                <ul className="absolute w-full rounded-md rounded-t-md shadow-2xl">
                    {options.map((option) => (
                        <li
                            key={option.name}
                            className={`flex items-center gap-2 px-2 bg-white ${option.selected && "bg-[#EAE9EF]"}`}
                        >
                            <input
                                id={option.name}
                                type="checkbox"
                                checked={option.selected}
                                onChange={() => onChange(option)}
                                className="h-5 w-5 accent-purple rounded-sm border border-[#D6D2E1]"
                            />
                            <label htmlFor={option.name} className="w-full h-full py-3.5 text-sm leading-4">
                                {option.name}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
