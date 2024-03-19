import { IResponse } from "@/services/utils";
import { logger } from "./logger";

export function makeApiCall(
    serverCall: Function,
    { toast, afterSuccess }: { toast?: any; afterSuccess?: Function }
) {
    serverCall()
        .then((response: IResponse) => {
            if (afterSuccess) afterSuccess();
            if (toast) {
                toast({
                    description: response.message,
                });
            } else {
                logger.info(response);
            }
        })
        .catch((error: any) => {
            if (toast) {
                toast({
                    description: error,
                });
            } else {
                logger.error(error);
            }
        });
}