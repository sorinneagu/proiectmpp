import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import AnnounceView from "../announceview/AnnounceView";
import { AuthContext } from "../../context/authContext";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

describe("AnnounceView", () => {
  const mockUser = { idusers: 1, username: "testuser" };
  const mockAnnounce = {
    idusers: 1,
    title: "Test Announce",
    description: "Test Description",
    images: "test-image-url",
    rating: 4.5,
    username: "testuser",
  };
  const mockReviews = [
    { idreviews: 1, review: "Great!", rating: 5, username: "user1" },
  ];

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === "http://localhost:5000/api/announces/1") {
        return Promise.resolve({ data: [mockAnnounce] });
      } else if (url === "http://localhost:5000/api/reviews?idannounce=1") {
        return Promise.resolve({ data: mockReviews });
      }
    });

    axios.delete.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(
      <AuthContext.Provider value={{ currentUser: mockUser }}>
        <MemoryRouter>
          <AnnounceView />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should fetch and display announce details", async () => {
    render(
      <AuthContext.Provider value={{ currentUser: mockUser }}>
        <MemoryRouter>
          <AnnounceView />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockAnnounce.title)).toBeInTheDocument();
      expect(screen.getByText(mockAnnounce.description)).toBeInTheDocument();
      expect(screen.getByText(/posted by/i)).toBeInTheDocument();
    });
  });

  it("should fetch and display reviews", async () => {
    render(
      <AuthContext.Provider value={{ currentUser: mockUser }}>
        <MemoryRouter>
          <AnnounceView />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockReviews[0].review)).toBeInTheDocument();
      expect(screen.getByText(mockReviews[0].username)).toBeInTheDocument();
    });
  });

  it("should handle delete action", async () => {
    window.confirm = jest.fn(() => true);
    render(
      <AuthContext.Provider value={{ currentUser: mockUser }}>
        <MemoryRouter>
          <AnnounceView />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockAnnounce.title)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("should handle navigation to add review", async () => {
    render(
      <AuthContext.Provider value={{ currentUser: mockUser }}>
        <MemoryRouter>
          <AnnounceView />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockAnnounce.title)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/add review/i));

    expect(mockNavigate).toHaveBeenCalledWith("/announce/1/review");
  });

  it("should handle navigation to edit announce", async () => {
    render(
      <AuthContext.Provider value={{ currentUser: mockUser }}>
        <MemoryRouter>
          <AnnounceView />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockAnnounce.title)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/edit/i));

    expect(mockNavigate).toHaveBeenCalledWith("/announce/edit/1");
  });
});
