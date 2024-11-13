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
        { name: "Currently active", count: 22, active: true },
        { name: "Upcoming", count: 14, active: false },
        { name: "Archived", count: 2, active: false },
    ]);
    const [discounts, setDiscounts] = useState([]);
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
                setDiscounts(data);
            } catch (error) {
                console.error("Error fetching discounts:", error);
            }
        };

        fetchDiscounts();
    }, [currentPage]);

    return (
        <div className="mt-4 flex flex-col gap-5">
            <div className="w-full flex justify-between gap-4">
                <h1 className={`${montserrat.className} font-bold text-4xl leading-[3rem]`}>Discounts</h1>
                <FilledButton onClick={openDiscountModal}>CREATE NEW DISCOUNT</FilledButton>
            </div>
            <FilterBar />
            <Tabs tabData={tabData} onTabChange={setActiveTab} />
            <Table data={discounts} />
            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setPage} />
            <CreateDiscountModal isOpen={discountModalOpen} onClose={closeDiscountModal} />
        </div>
    );
}
