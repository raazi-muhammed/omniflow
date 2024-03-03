import {
    ITeam,
    ITeamEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildAddTeamUseCase({
    Team,
}: {
    Team: ITeamEntityConstructor;
}) {
    return (data: ITeam) => {
        const team = new Team(data);
        return team.get();
    };
}
