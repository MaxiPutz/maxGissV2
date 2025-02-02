import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ENV } from "../../gloabVariable"; // Ensure correct path

const prisma = new PrismaClient();
const SECRET_KEY = ENV.SECRET_KEY;

/**
 * Registers a new user
 * @param {Request} req - The request object
 * @returns {Response}
 */
export async function POST(req) {
  try {
    // Convert request body
    /** @type {RegisterType} */
    const { email, password } = (await req.json());

    console.log("Email:", email);
    console.log("Password:", password);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Error processing request" }), { status: 500 });
  }
}
