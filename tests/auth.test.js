require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
beforeAll(async () => {
  console.log("🛠 DATABASE_URL in Jest:", process.env.DATABASE_URL);
  if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is not set in environment variables.");
  }

  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB Connected in Jest!");
});
afterAll(async () => {
  await User.deleteOne({ email: "john@example.com" });
  await mongoose.connection.close();
});

// Auth test cases
describe("Auth Tests", () => {
  it("should signup a user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});
