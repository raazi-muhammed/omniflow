import { describe, expect, it, test } from "@jest/globals";
import Member from "../member.entity.js";

describe("member entity", () => {
    it("should throw an error with invalid email", () => {
        const memberData = {
            email: "test.com",
            name: "hooi",
            username: "hooi",
            avatar: "http://what",
        };

        const member = new Member(memberData);
        const validate = () => member.validate();

        expect(validate).toThrow();
    });
    it("should return member without avatar", () => {
        const memberData = {
            email: "raazi@gami.com",
            name: "hooi",
            username: "hooi",
        };

        const member = new Member(memberData);
        const data = member.get();
        member.validate();

        expect(data).toEqual(memberData);
    });
    it("should return member with avatar", () => {
        const memberData = {
            email: "raazi@gsami.com",
            name: "hooi",
            username: "hooi",
            avatar: "http://what",
        };

        const member = new Member(memberData);
        member.validate();
        const data = member.get();

        expect(data).toEqual(memberData);
    });
});
