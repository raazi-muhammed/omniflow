export type ITeamProducers = {
    addMemberToTeam: (data: {
        userData: {
            avatar?: string;
            username: string;
            email: string;
        };
        projectId: string;
    }) => Promise<void>;
};
