import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMessageUseCases } from "../../interfaces/use-case.interface.js";

export default function buildAddMessageController({
    messageUseCases,
}: {
    messageUseCases: IMessageUseCases;
}) {
    return async (req: IRequest) => {
        const user = req.currentUser;
        const roomId = req.params.roomId;
        if (!roomId) throw new BadRequestError("No room id");
        const input = req.body;

        validateBody(input, ["content"]);

        const messages = await messageUseCases.addMessage({
            roomId,
            from: user,
            content: input.content,
        });

        const response = new ResponseCreator();
        return response.setData(messages);
    };
}
