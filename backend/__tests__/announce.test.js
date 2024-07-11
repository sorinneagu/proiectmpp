import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../app.js";

jest.mock("../connect.js"); // Mock the database connection
jest.mock("jsonwebtoken"); // Mock the jsonwebtoken

describe("Announce Controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAnnounces", () => {
    it("should return all announces", async () => {
      const mockData = [{ id: 1, title: "Test announce" }];
      db.query.mockImplementation((query, callback) => {
        callback(null, mockData);
      });

      const res = await request(app).get("/announces");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  });

  describe("getAnnounce", () => {
    it("should return a single announce", async () => {
      const mockData = [
        { id: 1, title: "Test announce", username: "TestUser" },
      ];
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockData);
      });

      const res = await request(app).get("/announces/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  });

  describe("createAnnounce", () => {
    it("should create a new announce", async () => {
      const token = "valid-token";
      const userInfo = { id: 1 };
      const mockData = { insertId: 1 };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, userInfo);
      });

      db.query.mockImplementation((query, values, callback) => {
        callback(null, mockData);
      });

      const res = await request(app)
        .post("/announces")
        .set("Cookie", `accessToken=${token}`)
        .send({
          title: "New announce",
          price: 100,
          description: "Test description",
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual("Announce created");
    });

    it("should handle invalid token", async () => {
      const token = "invalid-token";

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid token"), null);
      });

      const res = await request(app)
        .post("/announces")
        .set("Cookie", `accessToken=${token}`)
        .send({
          title: "New announce",
          price: 100,
          description: "Test description",
        });

      expect(res.status).toBe(403);
      expect(res.body).toEqual("Token is not valid!");
    });
  });

  describe("updateAnnounce", () => {
    it("should update an announce", async () => {
      const token = "valid-token";
      const userInfo = { id: 1 };
      const mockData = [{ idusers: 1 }];

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, userInfo);
      });

      db.query
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockData);
        })
        .mockImplementationOnce((query, values, callback) => {
          callback(null, { affectedRows: 1 });
        });

      const res = await request(app)
        .put("/announces/1")
        .set("Cookie", `accessToken=${token}`)
        .send({
          title: "Updated announce",
          price: 150,
          description: "Updated description",
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual("Announce updated");
    });

    it("should handle not logged in error", async () => {
      const res = await request(app).put("/announces/1").send({
        title: "Updated announce",
        price: 150,
        description: "Updated description",
      });

      expect(res.status).toBe(401);
      expect(res.body).toEqual("Not logged in!");
    });

    it("should handle invalid token error", async () => {
      const token = "invalid-token";

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid token"), null);
      });

      const res = await request(app)
        .put("/announces/1")
        .set("Cookie", `accessToken=${token}`)
        .send({
          title: "Updated announce",
          price: 150,
          description: "Updated description",
        });

      expect(res.status).toBe(403);
      expect(res.body).toEqual("Token is not valid!");
    });

    it("should handle announce not found error", async () => {
      const token = "valid-token";
      const userInfo = { id: 1 };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, userInfo);
      });

      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, []);
      });

      const res = await request(app)
        .put("/announces/1")
        .set("Cookie", `accessToken=${token}`)
        .send({
          title: "Updated announce",
          price: 150,
          description: "Updated description",
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual("Announce not found");
    });
  });

  describe("deleteAnnounce", () => {
    it("should delete an announce", async () => {
      const token = "valid-token";
      const userInfo = { id: 1 };
      const mockData = [{ idusers: 1 }];

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, userInfo);
      });

      db.query
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockData);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, { affectedRows: 1 });
        });

      const res = await request(app)
        .delete("/announces/1")
        .set("Cookie", `accessToken=${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual("Announce deleted");
    });

    it("should handle not logged in error", async () => {
      const res = await request(app).delete("/announces/1");

      expect(res.status).toBe(401);
      expect(res.body).toEqual("Not logged in!");
    });

    it("should handle invalid token error", async () => {
      const token = "invalid-token";

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid token"), null);
      });

      const res = await request(app)
        .delete("/announces/1")
        .set("Cookie", `accessToken=${token}`);

      expect(res.status).toBe(403);
      expect(res.body).toEqual("Token is not valid!");
    });
  });
});
