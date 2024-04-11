/* Meeting */
export type IMeeting = {
    name: string;
    projectId: string;
    agenda: string;
    notes?: string;
    startDate: Date;
    endDate?: Date;
    deletedAt?: Date;
    meetingLink?: string;
};

export interface IMeetingEntity extends IMeeting {
    validate: () => void;
    get: () => IMeeting;
}

export interface IMeetingEntityConstructor {
    new (data: IMeeting): IMeetingEntity;
}

/* Message */
export type IMessage = {
    roomId: string;
    from: object;
    content: string;
    type: MessageType;
    file?: {
        url: string;
        name: string;
    };
};

export enum MessageType {
    TEXT_ONLY = "TEXT_ONLY",
    IMAGE = "IMAGE",
    FILE = "FILE",
}

export interface IMessageEntity extends IMessage {
    validate: () => void;
    get: () => IMessage;
}

export interface IMessageEntityConstructor {
    new (data: IMessage): IMessageEntity;
}
