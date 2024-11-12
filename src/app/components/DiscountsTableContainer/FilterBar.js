"use client";
import CustomMultiselect from "@/app/components/CustomMultiselect";
import { useState } from "react";
import CustomSearch from "../CustomSearch";

export default function FilterBar() {
    // If they're simple and predefined, we can go this way.
    // Otherwise should filter all unique categories from discounts data.
    const [categoryOptions, setCategoryOptions] = useState([
        { name: "All events", selected: false },
        { name: "Ticket type", selected: false },
        { name: "Event", selected: false },
        { name: "Series", selected: false },
    ]);

    const handleCategoryOptionClick = (option) => {
        // Overwrite the previous array with just one updated option
        setCategoryOptions(
            categoryOptions.map((categoryOption) => {
                if (categoryOption.name === option.name) {
                    return {
                        ...categoryOption,
                        selected: !categoryOption.selected,
                    };
                }

                return categoryOption;
            })
        );
    };

    return (
        <div className="w-full flex h-10 gap-5">
            <div className="flex gap-3">
                <CustomSearch placeholder="Discount name, code" />
                <CustomMultiselect
                    placeholder="Applies to"
                    options={categoryOptions}
                    onChange={handleCategoryOptionClick}
                />
            </div>
            <div className="flex gap-5">
                <button className="py-2 px-5 border-2 border-purple rounded-md font-bold text-purple text-sm">
                    SEARCH
                </button>
                <button className="p-3 font-bold text-[#626262] text-sm">Clear All</button>
            </div>
        </div>
    );
}
