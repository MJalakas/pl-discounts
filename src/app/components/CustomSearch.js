import CloseIcon from "@/app/assets/CloseIcon.svg";
import SearchIcon from "@/app/assets/SearchIcon.svg";
import Image from "next/image";

export default function CustomSearch() {
    return (
        <div className="flex h-10 w-[284px] justify-between items-center bg-white rounded-md border-[#D6D2E1] border text-sm text-[#626262] leading-4 text-left">
            <input
                type="text"
                placeholder="Discount name, code"
                className="h-full w-full bg-transparent px-2 placeholder:text-sm placeholder:text-[#626262]"
            />
            <button className="h-full flex items-center border-r border-r-[#D6D2E1] p-3">
                <Image src={CloseIcon} alt="Close icon" className="min-w-4" />
            </button>
            <button className="h-full flex items-center p-3">
                <Image src={SearchIcon} alt="Search icon" className="min-w-4" />
            </button>
        </div>
    );
}
