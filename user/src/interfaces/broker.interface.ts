export type IUserProducers = {
    editUser: (userData: {
        avatar?: string;
        username: string;
        name: string;
        email: string;
    }) => Promise<void>;
};
