export default function Table({ data }) {
    const timePeriodFormat = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Applies to</th>
                    <th className="text-left">Time period</th>
                    <th className="text-left">Discount amount</th>
                    <th className="text-left">{/* Edit button */}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((discount) => {
                    const startTime = new Date(discount.startDate);
                    const endTime = new Date(discount.endDate);

                    const startTimeString = startTime.toLocaleDateString("et", timePeriodFormat);
                    const endTimeString = endTime.toLocaleDateString("et", timePeriodFormat);

                    const timePeriod = `${startTimeString} - ${endTimeString}`;

                    return (
                        <tr key={discount.id}>
                            <td>{discount.name}</td>
                            <td>{discount.appliesTo}</td>
                            <td>{timePeriod}</td>
                            <td>{discount.discountAmount}</td>
                            <td>{/* Edit button */}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
