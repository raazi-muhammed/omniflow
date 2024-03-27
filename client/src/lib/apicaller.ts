import { IResponse } from "@/services/api/utils";
import { logger } from "./logger";

export function makeApiCall(
    serverCall: Function,
    {
        toast,
        afterSuccess,
        afterError,
    }: { toast?: any; afterSuccess?: Function; afterError?: Function }
) {
    serverCall()
        .then((response: IResponse) => {
            if (afterSuccess) afterSuccess(response);
            if (toast) {
                toast({
                    description: response.message,
                });
            } else {
                logger.info(response);
            }
        })
        .catch((error: any) => {
            if (afterError) afterError(error);
            if (toast) {
                toast({
                    description: error,
                });
            } else {
                logger.error(error);
            }
        });
}
