import { montserrat } from "@/app/fonts";

export default function DiscountsPage() {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-between">
                <h1 className={`${montserrat.className} font-bold text-4xl leading-[3rem]`}>Discounts</h1>
                <button>create new discount</button>
            </div>
        </div>
    );
}
