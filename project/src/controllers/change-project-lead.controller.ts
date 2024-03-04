import { IRequest, validateBody } from "@omniflow/common";

export default function buildChangeProjectLeadController() {
    return async (req: IRequest) => {
        const inputBody = req.body;
        validateBody(inputBody, ["lead"]);

        console.log("CHange project lead");
    };
}
