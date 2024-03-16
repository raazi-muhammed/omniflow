export const logger = {
    info: (message?: any, ...optionalParams: any[]) => {
        console.info("info:", message, ...optionalParams);
    },
    debug: (message?: any, ...optionalParams: any[]) => {
        console.log("debug:", message, ...optionalParams);
    },
    error: (message?: any, ...optionalParams: any[]) => {
        console.error("error:", message, ...optionalParams);
    },
};
