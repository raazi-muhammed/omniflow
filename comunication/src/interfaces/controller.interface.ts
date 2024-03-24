import { IRequest, ResponseCreator } from "@omniflow/common";

export type IMeetingController = {
    addMeeting: (req: IRequest) => Promise<ResponseCreator>;
    getMeetings: (req: IRequest) => Promise<ResponseCreator>;
    getMeeting: (req: IRequest) => Promise<ResponseCreator>;
    addMeetingNotes: (req: IRequest) => Promise<ResponseCreator>;
    editMeetingNotes: (req: IRequest) => Promise<ResponseCreator>;
    removeMeetingNotes: (req: IRequest) => Promise<ResponseCreator>;
    editMeeting: (req: IRequest) => Promise<ResponseCreator>;
    removeMeeting: (req: IRequest) => Promise<ResponseCreator>;
    joinMeeting: (req: IRequest) => Promise<ResponseCreator>;
};
