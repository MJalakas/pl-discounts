"use client";
import { useState, useEffect } from "react";
import CustomMultiselect from "@/app/components/CustomMultiselect";

export default function AppliesToSelect({ listStyles, handleAppliesToChange, categoryOptions }) {
    const handleCategoryOptionClick = (option) => {
        // Overwrite the previous array with just one updated option
        handleAppliesToChange(option);
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
