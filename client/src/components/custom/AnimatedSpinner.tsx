"use client";
import React from "react";
import RingLoader from "react-spinners/RingLoader";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedSpinner({ isLoading }: { isLoading: boolean }) {
    return (
        <AnimatePresence>
            {isLoading ? (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "1rem", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="my-auto me-2">
                    <RingLoader
                        color={"white"}
                        loading={true}
                        size={15}
                        speedMultiplier={1.5}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </motion.div>
            ) : (
                false
            )}
        </AnimatePresence>
    );
}
