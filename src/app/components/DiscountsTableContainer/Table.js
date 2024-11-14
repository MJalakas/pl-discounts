"use client";
import Image from "next/image";
import PencilIcon from "@/app/assets/PencilIcon.svg";
import { useEffect, useState } from "react";
import CloseButton from "../CloseButton";

export default function Table({ data, onRowSave }) {
    const [editingRow, setEditingRow] = useState(null);

    // To display nice Estonian-looking dates.
    const timePeriodFormat = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    const PencilButton = (row) => {
        return (
            <button
                className="border border-[#D6D2E1] rounded-md p-2 hover:bg-gray-500 hover:bg-opacity-10 w-8 bg-white h-8"
                onClick={() => setEditingRow(row)}
            >
                <Image src={PencilIcon} alt="Edit button" />
            </button>
        );
    };

    const handleNameChange = (e) => {
        setEditingRow((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleAmountChange = (e) => {
        const amount = e.target.value;

        if (isNaN(amount)) {
            return; // Should also give some feedback.
        }

        setEditingRow((prev) => ({ ...prev, discountAmount: amount }));
    };

    const handleRowSave = (editingRow) => {
        onRowSave(editingRow);
        setEditingRow(null);
    };

    useEffect(() => {
        setEditingRow(null);
    }, [data]);

    useEffect(() => {
        console.log("Editing row:", editingRow);
    }, [editingRow]);

    return (
        <div className="w-full bg-white rounded-md border border-[#EAE9EF] custom-drop-shadow py-7 px-5 text-sm/4 min-w-[300px]">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="discount-table-header-row border-b border-[#D6D2E1]">
                        <th>Name</th>
                        <th>Applies to</th>
                        <th>Time period</th>
                        <th className="sm:table-cell hidden">Discount amount</th>
                        <th className="md:table-cell hidden">{/* Edit button */}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((discount, index) => {
                        const startTime = new Date(discount.startDate);
                        const endTime = new Date(discount.endDate);

                        const startTimeString = startTime.toLocaleDateString("et", timePeriodFormat);
                        const endTimeString = endTime.toLocaleDateString("et", timePeriodFormat);

                        const timePeriod = `${startTimeString} - ${endTimeString}`;

                        // Alternate row colors
                        const rowClass =
                            "discount-table-body-row border-b border-b-[#D6D2E1] " +
                            (index % 2 !== 0 ? "bg-[#F5F5F7]" : "");

                        return (
                            <tr key={discount.id} className={rowClass}>
                                <td className="text-purple-light font-bold">
                                    {editingRow?.id !== discount.id ? (
                                        discount.name
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={editingRow?.name}
                                            onChange={handleNameChange}
                                            className="flex max-w-full items-center bg-white rounded-md border-[#D6D2E1] max-h-10 border px-2 py-2 h-full text-sm/4  text-left"
                                        />
                                    )}
                                </td>
                                <td>{discount.category}</td>
                                <td className="md:w-full md:max-w-0 overflow-hidden text-ellipsis">{timePeriod}</td>
                                <td className="sm:table-cell hidden">
                                    {editingRow?.id !== discount.id ? (
                                        discount.discountAmount + " €"
                                    ) : (
                                        <div className="flex w-12 items-center justify-center gap-1">
                                            <input
                                                type="number"
                                                placeholder="€"
                                                value={editingRow?.discountAmount}
                                                onChange={handleAmountChange}
                                                className="flex max-w-full items-center bg-white rounded-md border-[#D6D2E1] max-h-10 border px-2 py-2 h-full text-sm/4 text-[#626262] text-left"
                                            />
                                            €
                                        </div>
                                    )}
                                </td>
                                <td className="md:flex hidden justify-end items-center my-1 !min-w-0">
                                    {editingRow?.id !== discount.id ? (
                                        PencilButton(discount)
                                    ) : (
                                        <div className="flex items-center h-8 gap-2">
                                            <CloseButton onClick={() => setEditingRow(null)} />
                                            <button
                                                className="border border-[#D6D2E1] rounded-md hover:bg-green-700 bg-green-600 text-white font-bold px-2 w-fit h-8"
                                                onClick={() => handleRowSave(editingRow)}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
