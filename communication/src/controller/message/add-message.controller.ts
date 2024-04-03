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
        const imageInput = req.file;
        const roomId = req.params.roomId;
        const input = req.body;
        if (!roomId) throw new BadRequestError("No room id");

        validateBody(input, ["content"]);

        const messages = await messageUseCases.addMessage({
            roomId,
            from: user,
            content: input.content,
            imageInput,
        });

        const response = new ResponseCreator();
        return response.setData(messages).setMessage("Message sent");
    };
}
