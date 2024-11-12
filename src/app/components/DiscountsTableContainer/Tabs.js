export default function Tabs({ tabData, onTabChange }) {
    return (
        <ul className="w-full flex gap-4 border-b border-b-[#D6D2E1] font-bold">
            {tabData.map((tab) => (
                <li key={tab.name} className="flex flex-col gap-1 leading-5">
                    <button
                        className={tab.active ? "text-purple" : "text-[#626262]"}
                        onClick={() => onTabChange(tab.name)}
                    >{`${tab.name} (${tab.count})`}</button>
                    {tab.active && <span className="w-full h-1 bg-purple rounded" />}
                </li>
            ))}
        </ul>
    );
}
