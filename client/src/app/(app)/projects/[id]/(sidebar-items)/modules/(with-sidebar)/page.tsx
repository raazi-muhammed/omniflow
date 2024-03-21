import ErrorMessage from "@/components/custom/ErrorMessage";
import React from "react";

export default function page() {
    return (
        <div className="h-screen-without-navbar mx-8 flex align-middle">
            <ErrorMessage type="info" message="Please select an point" />
        </div>
    );
}
