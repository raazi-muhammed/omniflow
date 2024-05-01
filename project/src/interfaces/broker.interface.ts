export type ITeamProducers = {
    addMemberToTeam: (data: {
        userData: {
            avatar?: string;
            username: string;
            email: string;
            name: string;
        };
        projectId: string;
    }) => Promise<void>;
};
