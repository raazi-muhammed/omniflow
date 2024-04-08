"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AnimateButton({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 1 }}>
            {children}
        </motion.div>
    );
}
