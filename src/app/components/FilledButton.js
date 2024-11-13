"use client";

export default function FilledButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center md:py-3 md:px-5 py-1 px-2 bg-purple hover:bg-[#3b2481] text-white text-center md:text-sm text-xs leading-4 rounded-md font-bold"
        >
            {children}
        </button>
    );
}
