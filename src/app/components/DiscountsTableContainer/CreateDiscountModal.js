"use client";

import FilledButton from "../FilledButton";
import CloseButton from "../CloseButton";
import AppliesToSelect from "./AppliesToSelect";

export default function CreateDiscountModal({ isOpen, onClose }) {
    const addDiscount = () => {
        // If only I had an endpoint to post to...

        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="flex flex-col gap-9 bg-white pt-8 pb-10 px-8 rounded-xl drop-shadow-2xl md:w-[542px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <h2>Create discount</h2>
                    <CloseButton onClick={onClose} />
                </div>
                <form className="flex flex-col gap-4">
                    <div className="flex h-10 w-full justify-between items-center bg-white rounded-md border-[#D6D2E1] border text-sm text-[#626262] leading-4 text-left">
                        <input
                            type="text"
                            placeholder="Discount name, code"
                            className="h-full w-full bg-transparent px-3 placeholder:text-sm placeholder:text-[#626262]"
                        />
                    </div>

                    <div className="w-full flex gap-4">
                        <AppliesToSelect listStyles={"drop-shadow-lg"} />
                        <FilledButton onClick={addDiscount}>ADD</FilledButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
