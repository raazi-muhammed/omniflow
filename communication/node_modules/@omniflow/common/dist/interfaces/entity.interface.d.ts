export interface IProject {
    id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: string;
    members: string[];
}
export interface IUser {
    id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}
