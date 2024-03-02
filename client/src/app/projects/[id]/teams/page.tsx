"use client";

import API from "@/lib/client";
import { useEffect } from "react";

export default function page() {
    useEffect(() => {
        const api = new API();

        api.team()
            .post("add-team", { data: { hoo: "foo" } })
            .then((response) => {
                console.log(response);
            });
    });
    return (
        <div>
            <p>Teams</p>
        </div>
    );
}
