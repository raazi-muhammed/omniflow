import { jest } from "@jest/globals";

export const UserMock = jest.fn().mockImplementation((data: any) => {
    return {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        isVerified: data.isVerified,
        avatar: data?.avatar,
        validate: jest.fn(),
        get: jest.fn().mockReturnValue({
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            isVerified: data.isVerified,
            avatar: data?.avatar,
        }),
    };
});
