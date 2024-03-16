export interface IModule {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    deletedAt: Date | null;
}
