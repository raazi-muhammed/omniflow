import { IResponse } from "@/services/api/utils";
import { logger } from "./logger";

export async function makeApiCall(
    serverCall: Function,
    {
        toast,
        afterSuccess,
        afterError,
    }: { toast?: any; afterSuccess?: Function; afterError?: Function }
) {
    try {
        const response: IResponse = await serverCall();

        if (afterSuccess) afterSuccess(response);
        if (toast) {
            toast({
                description: response.message,
            });
        } else {
            logger.info(response);
        }
    } catch (error) {
        if (afterError) afterError(error);
        if (toast) {
            toast({
                variant: "destructive",
                description: error,
            });
        } else {
            logger.error(error);
        }
    }
}
