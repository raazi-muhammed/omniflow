import { useEffect, useState } from "react";

export default function LinkConnector({
    to,
    from,
    data,
    container,
}: {
    to: string;
    from: string;
    container: string;
    data: any;
}) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        width: 1000,
        height: 100,
    });

    const [orientation, setOrientation] = useState<"tl" | "bl" | "tr" | "br">(
        "tl"
    );

    useEffect(() => {
        try {
            const A = document.querySelector(from);
            const B = document.querySelector(to);
            const CONTAINER = document.querySelector(container);

            if (A && B && CONTAINER) {
                const aPos = A.getBoundingClientRect();
                const bPos = B.getBoundingClientRect();
                const CONTAINERPos = CONTAINER.getBoundingClientRect();

                const newPosition = {
                    width: Math.abs(bPos.x - aPos.x),
                    height: Math.abs(bPos.y - aPos.y),
                    x: aPos.x + aPos.height / 2 - CONTAINERPos.x,
                    y: aPos.y + aPos.width / 2 - CONTAINERPos.y,
                };

                if (bPos.y - aPos.y < 0) {
                    if (bPos.x - aPos.x < 0) {
                        setOrientation("br");
                    } else {
                        setOrientation("bl");
                    }
                } else {
                    if (bPos.x - aPos.x < 0) {
                        setOrientation("tr");
                    } else {
                        setOrientation("tl");
                    }
                }

                console.log({ aPos, bPos, CONTAINERPos, newPosition });

                setPosition(newPosition);
            }
        } catch (error) {
            console.log(error);
        }
    }, [data]);

    return (
        <>
            {orientation == "bl" ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                    }}
                    className="pointer-events-none">
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 ${position.height} Q${position.width / 2} ${
                                position.height
                            } ${position.width / 2} ${position.height / 2} Q${
                                position.width / 2
                            } 0 ${position.width} 0
                             m${position.width} 0 Z`}
                            stroke="blue"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                </div>
            ) : orientation == "tr" ? (
                <div
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x - position.width}px`,
                        position: "absolute",
                    }}
                    className="pointer-events-none">
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 ${position.height} Q${position.width / 2} ${
                                position.height
                            } ${position.width / 2} ${position.height / 2} Q${
                                position.width / 2
                            } 0 ${position.width} 0
                             m${position.width} 0 Z`}
                            stroke="teal"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                </div>
            ) : orientation == "br" ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x - position.width}px`,
                        position: "absolute",
                    }}
                    className="pointer-events-none">
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 0 Q${position.width / 2} 0 ${
                                position.width / 2
                            } ${position.height / 2} Q${position.width / 2} ${
                                position.height
                            } ${position.width} ${position.height} m0 0 Z`}
                            stroke="white"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                </div>
            ) : (
                <div
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                    }}
                    className="pointer-events-none">
                    <svg
                        width={position.width}
                        height={position.height}
                        viewBox={`0 0 100% 100%`}>
                        <path
                            d={`M0 0 Q${position.width / 2} 0 ${
                                position.width / 2
                            } ${position.height / 2} Q${position.width / 2} ${
                                position.height
                            } ${position.width} ${position.height} m0 0 Z`}
                            stroke="orange"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                </div>
            )}
        </>
    );
}
