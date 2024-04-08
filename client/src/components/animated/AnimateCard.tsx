"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AnimateCard({
    children,
    type = "default",
}: {
    children: ReactNode;
    type?: "default" | "subtle";
}) {
    switch (type) {
        case "subtle":
            return (
                <motion.div
                    initial={false}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}>
                    {children}
                </motion.div>
            );
        case "default":
            return (
                <motion.div
                    initial={false}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    {children}
                </motion.div>
            );
        default:
            return (
                <motion.div
                    initial={false}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    {children}
                </motion.div>
            );
    }
}
