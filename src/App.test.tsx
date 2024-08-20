import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders UserProfile component", () => {
  render(<App />);
  const nameElement = screen.getByText(/Loading.../i);
  expect(nameElement).toBeInTheDocument();
});