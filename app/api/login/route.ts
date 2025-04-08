import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Input validation
        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password are required." },
                { status: 400 }
            );
        }

        // Find the user by username
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid username or password." },
                { status: 401 }
            );
        }

        // Compare the provided password with the hashed password stored in the DB
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return NextResponse.json(
                { message: "Invalid username or password." },
                { status: 401 }
            );
        }

        // Return a successful response with the username
        return NextResponse.json(
            { username: user.username },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
