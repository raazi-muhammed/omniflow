"use client";

import React from "react";
import JSONPretty from "react-json-pretty";

export default function JsonView({ data }: { data: string }) {
    try {
        const jsonData = JSON.parse(data);
        return (
            <JSONPretty
                theme={{
                    error: "line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;",
                    key: "color:#f92672;",
                    string: "color:#fd971f;",
                    value: "color:#a6e22e;",
                    boolean: "color:#ac81fe;",
                }}
                id="json-pretty"
                onJSONPrettyError={(e) => console.error(e)}
                data={jsonData}></JSONPretty>
        );
    } catch (error) {
        return <p>Json error</p>;
    }
}
