import { IUser } from "./entity.interface.js";

type IToken = {
    sign: (data: IUser) => string;
    verify: (token: string) => Promise<IUser | null>;
    validate: (auth: string) => boolean;
};

export default IToken;
