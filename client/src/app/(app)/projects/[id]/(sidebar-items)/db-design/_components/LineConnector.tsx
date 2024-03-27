import { ReactNode, useEffect, useState } from "react";

enum OriginTypes {
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export default function LinkConnector({
    to,
    from,
    data,
    container,
    children,
}: {
    to: string;
    from: string;
    container?: string;
    data?: any;
    children?: ReactNode;
}) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        width: 1000,
        height: 100,
    });

    const [origin, setOrigin] = useState<OriginTypes>(OriginTypes.TOP_LEFT);

    useEffect(() => {
        try {
            const fromElem = document.querySelector(from);
            const toElem = document.querySelector(to);

            if (!fromElem || !toElem) {
                console.log("invalid to or from elem");
                return;
            }

            const fromBounding = fromElem.getBoundingClientRect();
            const toBounding = toElem.getBoundingClientRect();

            const xPosition = fromBounding.x + fromBounding.width / 2;
            const yPosition = fromBounding.y + fromBounding.height / 2;

            let newPosition = {
                width: Math.abs(toBounding.x - fromBounding.x),
                height: Math.abs(toBounding.y - fromBounding.y),
                x: xPosition,
                y: yPosition,
            };

            const isHeightNegative = toBounding.y - fromBounding.y < 0;
            const isWidthNegative = toBounding.x - fromBounding.x < 0;

            if (isHeightNegative) {
                if (isWidthNegative) setOrigin(OriginTypes.BOTTOM_RIGHT);
                else setOrigin(OriginTypes.BOTTOM_LEFT);
            } else {
                if (isWidthNegative) setOrigin(OriginTypes.TOP_RIGHT);
                else setOrigin(OriginTypes.TOP_LEFT);
            }

            if (container) {
                const containerElem = document.querySelector(container);
                if (!containerElem) {
                    console.log("no container elem found");
                    return;
                }
                const containerBounding = containerElem.getBoundingClientRect();

                newPosition = {
                    ...newPosition,
                    x: newPosition.x - containerBounding.x,
                    y: newPosition.y - containerBounding.y,
                };
            }

            setPosition(newPosition);
        } catch (error) {
            console.log(error);
        }
    }, [data, container, to, from]);

    return (
        <>
            {origin == OriginTypes.BOTTOM_LEFT ? (
                <div
                    style={{
                        top: `${position.y - position.height}px`,
                        left: `${position.x}px`,
                        position: "absolute",
                        pointerEvents: "none",
                    }}>
                    <svg
                        style={{ pointerEvents: "none" }}
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
                            stroke="#4A228B"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                    <div
                        style={{
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: 0,
                            position: "absolute",
                        }}>
                        {children}
                    </div>
                </div>
            ) : origin == OriginTypes.TOP_RIGHT ? (
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
                            stroke="#4A228B"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                    <div
                        style={{
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: 0,
                            position: "absolute",
                        }}>
                        {children}
                    </div>
                </div>
            ) : origin == OriginTypes.BOTTOM_RIGHT ? (
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
                            stroke="#4A228B"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                    <div
                        style={{
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: 0,
                            position: "absolute",
                        }}>
                        {children}
                    </div>
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
                            stroke="#4A228B"
                            stroke-width="3"
                            fill="none"
                        />
                    </svg>
                    <div
                        style={{
                            bottom: 0,
                            right: 0,
                            left: 0,
                            top: 0,
                            position: "absolute",
                        }}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
