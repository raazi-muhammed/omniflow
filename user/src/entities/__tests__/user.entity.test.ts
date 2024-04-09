import { describe, expect, it } from "@jest/globals";
import User from "../user.entity.js";
import { IUser } from "../../interfaces/entity.interface.js";
import { BadRequestError } from "@omniflow/common";

describe("user entity", () => {
    const baseUserData: IUser = {
        email: "raazi@gmail.com",
        name: "raazi",
        username: "raazi",
        avatar: "http://avatar",
        isVerified: false,
        password: "password123",
    };

    it("should throw an error with invalid password", () => {
        const userData = { ...baseUserData, password: "pass" };

        const member = new User(userData);
        const validate = () => member.validate();

        expect(validate).toThrow(
            new BadRequestError("Password should be great than 7 characters")
        );
    });
    it("should throw an error with invalid email", () => {
        const userData = { ...baseUserData, email: "ra.com" };

        const member = new User(userData);
        const validate = () => member.validate();

        expect(validate).toThrow(new BadRequestError("Invalid email"));
    });
    it("should return user details with valid data", () => {
        const member = new User(baseUserData);
        member.validate();
        const data = member.get();

        expect(data).toEqual(baseUserData);
    });
});
