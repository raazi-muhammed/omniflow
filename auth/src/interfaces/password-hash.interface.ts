type IPasswordHash = {
    hash: (password: string) => Promise<string>;
    compare: (password1: string, password2: string) => Promise<boolean>;
};

export default IPasswordHash;
