import React from "react";
import RingLoader from "react-spinners/RingLoader";

export default function Spinner() {
    return (
        <div className="my-auto me-2">
            <RingLoader
                color={"white"}
                loading={true}
                size={15}
                speedMultiplier={1.5}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
