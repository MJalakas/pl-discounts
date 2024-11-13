"use client";

export default function FilledButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center py-3 px-5 bg-purple hover:bg-[#3b2481] text-white text-center text-sm leading-4 rounded-md font-bold"
        >
            {children}
        </button>
    );
}
