import Image from "next/image";
import PencilIcon from "@/app/assets/PencilIcon.svg";

export default function Table({ data }) {
    // To display nice Estonian-looking dates.
    const timePeriodFormat = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    const PencilButton = () => {
        return (
            <button className="border border-[#D6D2E1] rounded-md p-2 hover:bg-gray-500 hover:bg-opacity-10 w-8">
                <Image src={PencilIcon} alt="Edit button" />
            </button>
        );
    };

    return (
        <div className="w-full bg-white rounded-md border border-[#EAE9EF] custom-drop-shadow py-7 px-5 text-sm leading-4 min-w-[300px]">
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
                                <td className="text-purple-light font-bold">{discount.name}</td>
                                <td>{discount.category}</td>
                                <td className="md:w-full md:max-w-0 overflow-hidden text-ellipsis">{timePeriod}</td>
                                <td className="sm:table-cell hidden">{discount.discountAmount + "€"}</td>
                                <td className="md:flex hidden justify-end items-center my-0.5 !min-w-0">
                                    {PencilButton()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
