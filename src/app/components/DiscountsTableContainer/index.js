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
    const [tabData, setTabData] = useState([
        { name: "All", count: 38, active: true },
        { name: "Currently active", count: 22, active: false },
        { name: "Upcoming", count: 14, active: false },
        { name: "Archived", count: 2, active: false },
    ]);
    const [allDiscounts, setAllDiscounts] = useState([]);
    const [pageDiscounts, setPageDiscounts] = useState([]);
    const [filteredDiscounts, setFilteredDiscounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [discountModalOpen, setDiscountModalOpen] = useState(false);

    const setActiveTab = (tabName) => {
        setTabData(
            tabData.map((tab) => ({
                ...tab,
                active: tab.name === tabName,
            }))
        );
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

    // Compare discount dates to current date determine which tab it belongs to.
    const updateTabNames = (discounts) => {
        const currentDate = new Date();
        let activeCount = 0;
        let upcomingCount = 0;
        let archivedCount = 0;

        discounts.forEach((discount) => {
            const startDate = new Date(discount.startDate);
            const endDate = new Date(discount.endDate);

            if (startDate <= currentDate && endDate >= currentDate) {
                activeCount++;
            } else if (startDate > currentDate) {
                upcomingCount++;
            } else if (endDate < currentDate) {
                archivedCount++;
            }
        });

        setTabData([
            { name: "All", count: discounts.length, active: true },
            { name: "Currently active", count: activeCount, active: false },
            { name: "Upcoming", count: upcomingCount, active: false },
            { name: "Archived", count: archivedCount, active: false },
        ]);
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

                setAllDiscounts(data);
                updateTabNames(data);
            } catch (error) {
                console.error("Error fetching discounts:", error);
            }
        };

        fetchDiscounts();
    }, []);

    // Update the displayed discounts when the current page changes.
    useEffect(() => {
        setPageDiscounts(paginateDiscounts(allDiscounts, currentPage));
    }, [allDiscounts, currentPage]);

    return (
        <div className="mt-4 flex flex-col gap-5">
            <div className="w-full flex justify-between gap-4">
                <h1 className={`${montserrat.className} font-bold text-4xl leading-[3rem]`}>Discounts</h1>
                <FilledButton onClick={openDiscountModal}>CREATE NEW DISCOUNT</FilledButton>
            </div>
            <FilterBar />
            <Tabs tabData={tabData} onTabChange={setActiveTab} />
            <Table data={pageDiscounts} />
            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setPage} />
            <CreateDiscountModal isOpen={discountModalOpen} onClose={closeDiscountModal} />
        </div>
    );
}
