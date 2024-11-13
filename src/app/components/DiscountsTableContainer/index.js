"use client";

import { useState, useEffect } from "react";
import { montserrat } from "@/app/fonts";
import Tabs from "./Tabs";
import Table from "./Table";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import FilledButton from "@/app/components/FilledButton";
import CreateDiscountModal from "./CreateDiscountModal";

export default function DiscountsTableContainer() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tabData, setTabData] = useState([
        { name: "All", count: 0, active: true },
        { name: "Currently active", count: 0, active: false },
        { name: "Upcoming", count: 0, active: false },
        { name: "Archived", count: 0, active: false },
    ]);
    const [filters, setFilters] = useState({ search: "", appliesTo: [], tab: "All" });
    const [allDiscounts, setAllDiscounts] = useState({ active: [], upcoming: [], archived: [] });
    const [filteredDiscounts, setFilteredDiscounts] = useState([]);
    const [pageDiscounts, setPageDiscounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [discountModalOpen, setDiscountModalOpen] = useState(false);

    // Sort by descending end date. Just to have any order to it.
    const sortByEndTime = (discounts) => {
        return discounts.sort((a, b) => {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);

            return dateB - dateA;
        });
    };

    const setActiveTab = (tabName) => {
        setTabData(
            tabData.map((tab) => ({
                ...tab,
                active: tab.name === tabName,
            }))
        );

        setFilters({ ...filters, tab: tabName });
    };

    const handleFilterApply = (search, appliesTo) => {
        setFilters((prevState) => ({
            ...prevState,
            search,
            appliesTo,
        }));
    };

    const setPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const openDiscountModal = () => {
        setDiscountModalOpen(true);
    };

    const closeDiscountModal = () => {
        setDiscountModalOpen(false);
    };

    const paginateDiscounts = (discounts, page) => {
        const itemsPerPage = 10;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return discounts.slice(startIndex, endIndex);
    };

    // Group the discounts by the tabs.
    const groupDiscounts = (discounts) => {
        const currentDate = new Date();
        const active = [];
        const upcoming = [];
        const archived = [];

        discounts.forEach((discount) => {
            const startDate = new Date(discount.startDate);
            const endDate = new Date(discount.endDate);

            if (startDate <= currentDate && endDate >= currentDate) {
                active.push(discount);
            } else if (startDate > currentDate) {
                upcoming.push(discount);
            } else if (endDate < currentDate) {
                archived.push(discount);
            }
        });

        return { active, upcoming, archived };
    };

    const updateTabNames = (groupedDiscounts, activeTab = "All") => {
        const { active, upcoming, archived } = groupedDiscounts;
        const combinedDiscounts = active.concat(upcoming, archived);

        setTabData([
            { name: "All", count: combinedDiscounts.length, active: activeTab === "All" },
            { name: "Currently active", count: active.length, active: activeTab === "Currently active" },
            { name: "Upcoming", count: upcoming.length, active: activeTab === "Upcoming" },
            { name: "Archived", count: archived.length, active: activeTab === "Archived" },
        ]);

        return { active, upcoming, archived };
    };

    // Clear button will clear all but the tab filter.
    const clearFilters = () => {
        setFilters({ search: "", appliesTo: [], tab: filters.tab });
    };

    // Fetch all discounts on render.
    useEffect(() => {
        /* Discounts example:
        [
            {
                "id": 1,
                "name": "Early Bird Discount",
                "startDate": "2023-05-01",
                "endDate": "2023-05-15",
                "discountAmount": 10,
                "category": "Ticket type"
            }
        ]
        */

        const fetchDiscounts = async () => {
            try {
                const response = await fetch(`https://api.intra.piletilevi.ee/v1/discounts`);
                const data = await response.json();

                const groupedData = groupDiscounts(data);
                updateTabNames(groupedData);

                setAllDiscounts({
                    active: sortByEndTime(groupedData.active),
                    upcoming: sortByEndTime(groupedData.upcoming),
                    archived: sortByEndTime(groupedData.archived),
                });
            } catch (error) {
                console.error("Error fetching discounts:", error);
            }
        };

        fetchDiscounts();
    }, []);

    // Update filtered discounts when filters change.
    useEffect(() => {
        if (!filters || !allDiscounts) return;

        const { search, appliesTo, tab } = filters;

        // Start off with all discounts in one array and we'll filter from here.
        let filtered = allDiscounts.active.concat(allDiscounts.upcoming, allDiscounts.archived);

        // Search term filter. Partial match for now, but ideally would include something more fuzzy.
        if (search) {
            filtered = filtered.filter((discount) => discount.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Category filter.
        if (appliesTo.length > 0) {
            filtered = filtered.filter((discount) => appliesTo.includes(discount.category));
        }

        // Regroup and recalculate tab counts before filtering by them.
        const groupedDiscounts = groupDiscounts(filtered);
        updateTabNames(groupedDiscounts, tab);

        switch (tab) {
            case "Currently active":
                filtered = groupedDiscounts.active;
                break;
            case "Upcoming":
                filtered = groupedDiscounts.upcoming;
                break;
            case "Archived":
                filtered = groupedDiscounts.archived;
                break;
            default:
                break;
        }

        setFilteredDiscounts(filtered);

        // Reset the current page to 1 when filters change.
        setCurrentPage(1);

        // Update the displayed discounts.
        setPageDiscounts(paginateDiscounts(filtered, 1));
    }, [filters, allDiscounts]);

    return (
        <div className="mt-4 flex flex-col gap-5">
            <div className="w-full flex justify-between gap-4">
                <h1 className={`${montserrat.className} font-bold text-4xl leading-[3rem]`}>Discounts</h1>
                <FilledButton onClick={openDiscountModal}>CREATE NEW DISCOUNT</FilledButton>
            </div>
            <FilterBar handleFilterApply={handleFilterApply} clearFilters={clearFilters} />
            <Tabs tabData={tabData} onTabChange={setActiveTab} />
            <Table data={pageDiscounts} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredDiscounts.length / rowsPerPage)}
                onPageChange={setPage}
            />
            <CreateDiscountModal isOpen={discountModalOpen} onClose={closeDiscountModal} />
        </div>
    );
}
