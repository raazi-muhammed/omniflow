export function formatConstants(inputString: string) {
    const words = inputString.split("_");
    return words
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}
