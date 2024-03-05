import { IRequest, ResponseCreator } from "@omniflow/common";
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

        const user = await memberRepository.getByUsername(currentUser.username);
        if (!user) throw new Error("Not a member on any project");

        const data = await projectRepository.getAll(user._id);
        console.log({ data });

        const response = new ResponseCreator();
        return response.setData(data);
    };
}
