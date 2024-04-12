import LoginForm from "@/app/(auth)/login/_forms/LoginForm";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

jest.mock("next/navigation");
jest.mock("react-redux");
jest.mock("axios");

describe("Login form", () => {
    beforeEach(() => {
        render(<LoginForm />);
    });

    it("should render email password input and login button", () => {
        const emailInput = screen.getByPlaceholderText(
            "email"
        ) as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText(
            "password"
        ) as HTMLInputElement;
        const loginButton = screen.getByRole("button", {
            name: "Login",
        }) as HTMLInputElement;

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it("should have data when typed", async () => {
        const emailInput = screen.getByPlaceholderText(
            "email"
        ) as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText(
            "password"
        ) as HTMLInputElement;

        const loginButton = screen.getByRole("button", {
            name: "Login",
        }) as HTMLInputElement;

        expect(emailInput.value).toBe("");
        expect(passwordInput.value).toBe("");

        const user = userEvent.setup();
        await user.type(emailInput, "foo@example.com");
        await user.type(passwordInput, "password123");

        expect(emailInput.value).toBe("foo@example.com");
        expect(passwordInput.value).toBe("password123");

        await user.click(loginButton);
        // expect(axios.post).toHaveBeenCalled();
    });
});
