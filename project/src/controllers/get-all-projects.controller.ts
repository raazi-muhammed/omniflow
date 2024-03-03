import { IRequest, ReposeCreator } from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../interfaces/repository.interface.js";

export default function buildGetAllProjectsController({
    memberRepository,
    projectRepository,
}: {
    memberRepository: IMemberRepository;
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        if (!currentUser) throw new Error("Please login");

        const user = await memberRepository.getByUsername(currentUser.username);
        if (!user) throw new Error("Not a member on any project");

        const data = await projectRepository.getAll(user._id);

        const response = new ReposeCreator();
        return response.setData(data);
    };
}
