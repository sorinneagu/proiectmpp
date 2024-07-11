import request from "supertest";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import app from "../app.js";

jest.mock("../connect.js");
jest.mock("jsonwebtoken");

describe("Review Controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getReviews", () => {
    it("should return all reviews for a given announce", async () => {
      const mockData = [{ id: 1, review: "Great!" }];
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockData);
      });

      const res = await request(app).get("/reviews?idannounce=1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  });

  describe("createReview", () => {
    it("should create a new review", async () => {
      const mockToken = "valid-token";
      const mockUserInfo = { id: 1 };
      const mockData = { affectedRows: 1 };
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUserInfo);
      });
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockData);
      });

      const res = await request(app)
        .post("/reviews")
        .set("Cookie", `accessToken=${mockToken}`)
        .send({ rating: 5, review: "Excellent!", idannounces: 1 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual("Review has been created!");
    });

    it("should return 401 if not logged in", async () => {
      const res = await request(app)
        .post("/reviews")
        .send({ rating: 5, review: "Excellent!", idannounces: 1 });

      expect(res.status).toBe(401);
    });

    it("should handle invalid token", async () => {
      const mockToken = "invalid-token";
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Token is not valid!"), null);
      });

      const res = await request(app)
        .post("/reviews")
        .set("Cookie", `accessToken=${mockToken}`)
        .send({ rating: 5, review: "Excellent!", idannounces: 1 });

      expect(res.status).toBe(403);
    });
  });

  describe("updateReview", () => {
    it("should update an existing review", async () => {
      const mockToken = "valid-token";
      const mockUserInfo = { id: 1 };
      const mockData = [{ idusers: 1 }];
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUserInfo);
      });
      db.query.mockImplementation((query, params, callback) => {
        if (query.includes("SELECT")) {
          callback(null, mockData);
        } else {
          callback(null, { affectedRows: 1 });
        }
      });

      const res = await request(app)
        .put("/reviews/1")
        .set("Cookie", `accessToken=${mockToken}`)
        .send({ rating: 4, review: "Very good!" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual("Review updated");
    });

    it("should return 401 if not authenticated", async () => {
      const res = await request(app)
        .put("/reviews/1")
        .send({ rating: 4, review: "Very good!" });

      expect(res.status).toBe(401);
    });

    it("should return 404 if review not found", async () => {
      const mockToken = "valid-token";
      const mockUserInfo = { id: 1 };
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUserInfo);
      });
      db.query.mockImplementation((query, params, callback) => {
        callback(null, []);
      });

      const res = await request(app)
        .put("/reviews/1")
        .set("Cookie", `accessToken=${mockToken}`)
        .send({ rating: 4, review: "Very good!" });

      expect(res.status).toBe(404);
    });

    it("should return 403 if not the owner", async () => {
      const mockToken = "valid-token";
      const mockUserInfo = { id: 1 };
      const mockData = [{ idusers: 2 }];
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUserInfo);
      });
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockData);
      });

      const res = await request(app)
        .put("/reviews/1")
        .set("Cookie", `accessToken=${mockToken}`)
        .send({ rating: 4, review: "Very good!" });

      expect(res.status).toBe(403);
    });
  });

  describe("deleteReview", () => {
    it("should delete an existing review", async () => {
      const mockToken = "valid-token";
      const mockUserInfo = { id: 1 };
      const mockData = [{ idusers: 1 }];
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUserInfo);
      });
      db.query.mockImplementation((query, params, callback) => {
        if (query.includes("SELECT")) {
          callback(null, mockData);
        } else {
          callback(null, { affectedRows: 1 });
        }
      });

      const res = await request(app)
        .delete("/reviews/1")
        .set("Cookie", `accessToken=${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual("Review deleted");
    });

    it("should return 404 if not authenticated", async () => {
      const res = await request(app).delete("/reviews/1");

      expect(res.status).toBe(401);
    });

    it("should return 403 if not the owner", async () => {
      const mockToken = "valid-token";
      const mockUserInfo = { id: 1 };
      const mockData = [{ idusers: 2 }];
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUserInfo);
      });
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockData);
      });

      const res = await request(app)
        .delete("/reviews/1")
        .set("Cookie", `accessToken=${mockToken}`);

      expect(res.status).toBe(403);
    });
  });
});
