import Link from "next/link";

export default function Breadcrumbs() {
    // Non-dynamic for demo. In reality I'd generate crumbs based on path, or for a SPA just pass them as props.
    return (
        <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex gap-2">
                <li>
                    <Link href="/">Back office</Link>
                </li>
                <div>{">"}</div>
                <li>
                    <Link href="/codes">Codes</Link>
                </li>
                <div className="text-[#9A9A9A]">{">"}</div>
                <li>
                    <Link href="/codes/discounts" className="text-[#9A9A9A]">
                        Discounts
                    </Link>
                </li>
            </ol>
        </nav>
    );
}
