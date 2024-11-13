"use client";
import { useState } from "react";
import CustomSearch from "../CustomSearch";
import AppliesToSelect from "./AppliesToSelect";

export default function FilterBar({ handleFilterApply, clearFilters }) {
    const [search, setSearch] = useState("");

    // If they're simple and predefined, we can go this way.
    // Otherwise should filter all unique categories from discounts data.
    const [appliesTo, setAppliesTo] = useState([
        { name: "All events", selected: false },
        { name: "Ticket type", selected: false },
        { name: "Event", selected: false },
        { name: "Series", selected: false },
    ]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchClear = () => {
        setSearch("");
    };

    const handleAppliesToChange = (newOption) => {
        setAppliesTo((prevState) =>
            prevState.map((option) =>
                option.name === newOption.name ? { ...option, selected: !option.selected } : option
            )
        );
    };

    const handleClearFilters = () => {
        setSearch("");
        // Set all selected to false, but keep the same array reference.
        setAppliesTo((prevState) => prevState.map((option) => ({ ...option, selected: false })));
        clearFilters();
    };

    const onFilterApply = () => {
        // Convert the objects array to an array of just names.
        const appliesToNames = appliesTo.filter((option) => option.selected).map((option) => option.name);
        handleFilterApply(search, appliesToNames);
    };

    return (
        <div className="w-full flex lg:flex-row lg:items-start flex-col items-center lg:h-10 gap-5">
            <div className="flex gap-3 lg:flex-row flex-col">
                <CustomSearch
                    placeholder="Discount name, code"
                    search={search}
                    handleSearchChange={handleSearchChange}
                    handleSearchClear={handleSearchClear}
                    onSearchButtonClick={onFilterApply}
                />
                <div className="w-[284px]">
                    <AppliesToSelect
                        listStyles={"custom-drop-shadow"}
                        handleAppliesToChange={handleAppliesToChange}
                        categoryOptions={appliesTo}
                    />
                </div>
            </div>
            <div className="flex gap-5">
                <button
                    className="py-2 px-5 border-2 border-purple rounded-md font-bold text-purple text-sm/4 hover:bg-gray-500 hover:bg-opacity-5"
                    onClick={onFilterApply}
                >
                    SEARCH
                </button>
                <button
                    className="p-3 font-bold text-[#626262] text-sm/4 hover:bg-gray-500 hover:bg-opacity-5"
                    onClick={handleClearFilters}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
