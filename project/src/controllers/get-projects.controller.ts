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
        console.log({ currentUser });

        const user = await memberRepository.upsert(currentUser);
        const data = await projectRepository.getAll(user?._id);

        const response = new ResponseCreator();
        return response.setData(data);
    };
}
