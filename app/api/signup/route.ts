import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // Input validation
        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password are required." },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            return NextResponse.json(
                { message: "Username already exists." },
                { status: 400 }
            );
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create new user with hashed password
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // Remove the password field from the response
        const { password: _discard, ...userWithoutPassword } = newUser;

        return new NextResponse(JSON.stringify(userWithoutPassword), { status: 201 });
    } 
    catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(
            JSON.stringify({ error: "Error creating user" }),
            { status: 500 }
        );
    }
}
