export const ProjectMock = jest.fn().mockImplementation((data) => {
    return {
        title: data.title,
        description: data.description,
        priority: data.priority,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lead: data.lead,
        members: data.members,
        isDeleted: data.isDeleted,
        validate: jest.fn(),
        get: jest.fn().mockReturnValue({
            title: data.title,
            description: data.description,
            priority: data.priority,
            startDate: data.startDate,
            dueDate: data.dueDate,
            isDeleted: data.isDeleted,
            lead: data.lead,
            members: data.members,
        }),
    };
});
