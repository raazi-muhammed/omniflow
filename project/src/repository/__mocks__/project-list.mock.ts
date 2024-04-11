import { IDBProject } from "../mongo/models/project.model.js";
import {
    AccessLevels,
    IAccess,
    IMember,
    IMemberInProject,
    IProject,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import { jest } from "@jest/globals";
import { Types } from "mongoose";
import { IDBMember } from "../mongo/models/members.model.js";

const sampleProjectData: IProject = {
    id: "55153a8014829a865bbf700d",
    title: "shop",
    description: "simple project",
    dueDate: new Date(),
    isDeleted: false,
    lead: new Types.ObjectId("55153a8014829a865bbf700d"),
    members: [
        {
            access: {
                apiDoc: AccessLevels.CAN_EDIT,
                dbDesign: AccessLevels.CAN_EDIT,
                module: AccessLevels.CAN_EDIT,
            },
            info: {
                id: "55153a8014829a865bbf700d",
                email: "raazi@gmail.com",
                name: "raazi",
                username: "raazi",
            } as IDBMember,
            inviteStatus: InviteStatus.ACCEPTED,
            role: Role.TEAM_LEAD,
        },
    ],
    priority: 1,
    startDate: new Date(),
};

export const mockProjectRepository = {
    add: jest
        .fn<(data: IProject) => Promise<IDBProject | null>>()
        .mockResolvedValue(sampleProjectData as IDBProject),
    edit: jest.fn<
        (data: {
            id: string;
            title: string;
            description: string;
            startDate: Date;
            dueDate: Date;
            priority: number;
        }) => Promise<boolean | null>
    >(),
    getAll: jest
        .fn<(userId: string) => Promise<IDBProject[] | null>>()
        .mockResolvedValue([sampleProjectData] as IDBProject[]),
    get: jest
        .fn<(id: string) => Promise<IDBProject | null>>()
        .mockResolvedValue(sampleProjectData as IDBProject),
    delete: jest
        .fn<(id: string) => Promise<boolean | null>>()
        .mockImplementation((id: string) => {
            if (id == sampleProjectData.id) return Promise.resolve(true);
            else return Promise.resolve(false);
        }),
    addMember:
        jest.fn<
            (data: {
                projectId: string;
                member: IMemberInProject;
            }) => Promise<boolean | null>
        >(),
    removeMember:
        jest.fn<
            (data: {
                projectId: string;
                memberId: string;
            }) => Promise<boolean | null>
        >(),
    changeTeamLead: jest
        .fn<
            (data: {
                projectId: string;
                userId: string;
            }) => Promise<boolean | null>
        >()
        .mockImplementation(({ projectId }) => {
            if (projectId == sampleProjectData.id) return Promise.resolve(true);
            return Promise.resolve(false);
        }),
    changeMemberAccess:
        jest.fn<
            (data: {
                projectId: string;
                userId: string;
                access: IAccess;
            }) => Promise<null>
        >(),
};
