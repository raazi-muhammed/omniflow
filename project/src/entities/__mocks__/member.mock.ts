export const MemberMock = jest.fn().mockImplementation((data) => {
    return {
        name: data.name,
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        validate: jest.fn(),
        get: jest.fn().mockReturnValue({
            name: data.name,
            username: data.username,
            email: data.email,
            avatar: data.avatar,
        }),
    };
});
