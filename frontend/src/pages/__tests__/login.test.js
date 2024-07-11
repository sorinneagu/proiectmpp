import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../components/login_register/login.js";
import { AuthContext } from "../../context/authContext";
import "@testing-library/jest-dom/extend-expect";

// Mock AuthContext
const mockLogin = jest.fn();
const mockAuthContextValue = {
  login: mockLogin,
};

describe("LoginForm Component", () => {
  it("renders without crashing", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByText(/Sing Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });
});

describe("LoginForm Component", () => {
  it("handles input changes", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpassword");
  });
});

describe("LoginForm Component", () => {
  it("handles form submission and error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    await act(async () => {
      const loginButton = screen.getByText(/Log In/i);
      fireEvent.click(loginButton);
    });

    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));
    waitFor(() =>
      expect(screen.getByText("User not found!")).toBeInTheDocument()
    );
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });
});
