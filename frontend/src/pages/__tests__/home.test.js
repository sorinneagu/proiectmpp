import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../home/Home";
import { AuthContext } from "../../context/authContext";
import "@testing-library/jest-dom/extend-expect";

const mockUser = { idusers: 1, username: "testuser" };

const mockNavigate = jest.fn();

const AuthContextProvider = ({ children }) => (
  <AuthContext.Provider value={{ currentUser: mockUser }}>
    {children}
  </AuthContext.Provider>
);
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContextProvider>
    );

    expect(screen.getByText(/new card/i)).toBeInTheDocument();
  });

  it('handles navigation to "/add" when "New Card" button is clicked', () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText(/new card/i));

    expect(mockNavigate).toHaveBeenCalledWith("/add");
  });

  it("renders the Card component", () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContextProvider>
    );

    // Assuming Card component renders something identifiable
    expect(screen.getByTestId("card-component")).toBeInTheDocument();
  });
});
