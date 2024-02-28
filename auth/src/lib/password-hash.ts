import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function compare(password1: string, password2: string): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
}

export default Object.freeze({
    hash,
    compare,
});
