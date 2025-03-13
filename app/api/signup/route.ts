import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request) {
    const { username, password } = await req.json();

    try {
        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username: username },
        });
        if (existingUser) {
            return NextResponse.json({ message: "Username already exists." }, { status: 400 });
        }
        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
            },
        });

        return new NextResponse(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(JSON.stringify({ error: "Error creating user" }), { status: 500 });
    }
}