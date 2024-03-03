export type ICreateNameFromEmail = (email: string) => {
    username: string;
    name: string;
};

export type InvitationTokenData = {
    projectId: string;
    memberId: string;
    message: string;
};
