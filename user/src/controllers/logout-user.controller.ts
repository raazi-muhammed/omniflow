import { IRequest, ResponseCreator } from "@omniflow/common";
import { TOKEN_COOKIE_NAME } from "../lib/constants.js";

export default function buildLogOutUserController() {
    return async (req: IRequest) => {
        const response = new ResponseCreator();
        return response
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`,
            })
            .setMessage("User logged out")
            .setStatusCode(204);
    };
}
