"use client";
import CustomSearch from "../CustomSearch";
import AppliesToSelect from "./AppliesToSelect";

export default function FilterBar() {
    return (
        <div className="w-full flex h-10 gap-5">
            <div className="flex gap-3">
                <CustomSearch placeholder="Discount name, code" />
                <div className="w-[284px]">
                    <AppliesToSelect listStyles={"custom-drop-shadow"} />
                </div>
            </div>
            <div className="flex gap-5">
                <button className="py-2 px-5 border-2 border-purple rounded-md font-bold text-purple text-sm/4 hover:bg-gray-500 hover:bg-opacity-5">
                    SEARCH
                </button>
                <button className="p-3 font-bold text-[#626262] text-sm/4 hover:bg-gray-500 hover:bg-opacity-5">
                    Clear All
                </button>
            </div>
        </div>
    );
}
