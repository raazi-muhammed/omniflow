import { IRequest, ReposeCreator } from "@omniflow/common";

export default function buildTeamController() {
    return async (req: IRequest) => {
        console.log({ user: req.currentUser, project: req.currentProject });

        const response = new ReposeCreator();
        return response.setData("Hello how are you??");
    };
}
