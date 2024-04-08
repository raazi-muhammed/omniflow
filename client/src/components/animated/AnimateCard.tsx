"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AnimateCard({ children }: { children: ReactNode }) {
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
