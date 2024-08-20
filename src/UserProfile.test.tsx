import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./UserProfile";

global.fetch = jest.fn();

describe("UserProfile Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading indicator during API request", () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ name: "John Doe", email: "john@example.com" }),
    });

    render(<UserProfile />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays user data after successful API request", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ name: "John Doe", email: "john@example.com" }),
    });

    render(<UserProfile />);
    await screen.findByText("John Doe");
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  test("displays error message when API request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    render(<UserProfile />);
    await screen.findByText(/Failed to fetch user data/);
  });
});
