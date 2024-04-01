import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMessageUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetMessagesController({
    messageUseCases,
}: {
    messageUseCases: IMessageUseCases;
}) {
    return async (req: IRequest) => {
        const roomId = req.params.roomId;
        if (!roomId) throw new BadRequestError("No room id");

        const messages = await messageUseCases.getMessages({
            roomId,
        });

        const response = new ResponseCreator();
        return response.setData(messages);
    };
}
