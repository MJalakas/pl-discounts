"use client";
import { useState } from "react";
import CustomMultiselect from "@/app/components/CustomMultiselect";

export default function AppliesToSelect({ listStyles }) {
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
        <CustomMultiselect
            placeholder="Applies to"
            options={categoryOptions}
            onChange={handleCategoryOptionClick}
            listStyles={listStyles}
        />
    );
}
