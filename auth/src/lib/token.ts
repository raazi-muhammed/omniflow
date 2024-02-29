import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/entity.interface.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function sign(data: IUser) {
    if (!ACCESS_TOKEN_SECRET) throw new Error("No salt found for jwt");

    const jsonData = JSON.parse(JSON.stringify(data));
    return jwt.sign(jsonData, ACCESS_TOKEN_SECRET);
}

export async function verify(token: string) {
    if (!ACCESS_TOKEN_SECRET) throw new Error("No salt found for jwt");

    const tokenData = token.split(" ")[1];

    return new Promise<IUser | null>((resolve) => {
        jwt.verify(tokenData, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) resolve(null);
            else resolve(user as IUser);
        });
    });
}

export function validate(auth: string) {
    if (!auth) throw new Error("No token found");

    const token = auth.split(" ")[1];
    if (!token) throw new Error("Invalid token");
    return true;
}

export default Object.freeze({
    sign,
    verify,
    validate,
});
