export type IToken<T> = {
    sign: (data: Object) => string;
    verify: (token: string) => Promise<T | null>;
    validate: (auth: string) => boolean;
};
