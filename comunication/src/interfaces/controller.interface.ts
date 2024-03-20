import { IRequest, ResponseCreator } from "@omniflow/common";

export type IMeetingController = {
    addMeeting: (req: IRequest) => Promise<ResponseCreator>;
    getMeetings: (req: IRequest) => Promise<ResponseCreator>;
};
