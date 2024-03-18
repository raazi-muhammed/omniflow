export interface IModule {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    dependencies: [string];
    deletedAt: Date | null;
}

export interface IModuleEntity extends IModule {
    validate: () => void;
    get: () => IModule;
}

export interface IModuleEntityConstructor {
    new (data: IModule): IModuleEntity;
}
