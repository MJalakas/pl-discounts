import DropdownArrow from "@/app/assets/DropdownArrow.svg";
import Image from "next/image";

export default function MainHeaderUser() {
    // Non-functional for demo, of course.
    return (
        <div className="md:flex hidden w-full justify-end gap-8 max-h-6">
            <div className="flex w-full justify-end gap-2">
                <div>EN</div>
                <div className="flex items-center w-[10px]">
                    <Image src={DropdownArrow} alt="Dropdown arrow" />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <div className="text-nowrap">Name Surname</div>
                <div className="w-[1px] bg-[#D6D2E1]" />
                <div className="flex gap-2">
                    <div className="font-bold">Noorsooteater</div>
                    <div className="flex items-center w-[10px]">
                        <Image src={DropdownArrow} alt="Dropdown arrow" />
                    </div>
                </div>
            </div>
        </div>
    );
}
