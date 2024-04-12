import LoginForm from "@/app/(auth)/login/_forms/LoginForm";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// Mock useRouter
jest.mock("next/navigation");
jest.mock("react-redux");

describe("Page", () => {
    it("renders a heading", () => {
        render(<LoginForm />);

        const heading = screen.getByText("Email");

        expect(heading).toBeInTheDocument();
    });
});
