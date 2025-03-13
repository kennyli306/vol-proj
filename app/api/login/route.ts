import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Input validation
        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
        }

        // Find the user by username
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid username." }, { status: 401 });
        }

        if (password != user.password) {
            return NextResponse.json({ message: "Invalid password." }, { status: 401 });
        }
        return NextResponse.json({
            username: user.username,
        });

    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    } 
}

