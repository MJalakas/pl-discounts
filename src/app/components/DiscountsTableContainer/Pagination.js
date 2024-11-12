import Image from "next/image";
import ArrowLeft from "@/app/assets/ArrowLeft.svg";
import ArrowRight from "@/app/assets/ArrowRight.svg";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    // Ugly function to generate page numbers array, but I think it's better to do this than any other kind of array/map.
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="w-full flex justify-center gap-4 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-md bg-white flex items-center justify-center border border-[#D6D2E1]"
            >
                <Image src={ArrowLeft} alt="Previous page" />
            </button>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`text-lg ${page === currentPage ? "underline" : "text-purple-light"}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-md bg-white flex items-center justify-center border border-[#D6D2E1]"
            >
                <Image src={ArrowRight} alt="Next page" />
            </button>
        </div>
    );
}
