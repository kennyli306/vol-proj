import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    try {
        const { oldUsername, newUsername } = await request.json();

        if (!newUsername) {
            return NextResponse.json({ message: "New username cannot be empty" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username: newUsername },
        });

        if (existingUser) {
            return NextResponse.json({ message: "Username already taken" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { username: oldUsername },
            data: { username: newUsername },
        });

        return NextResponse.json({ message: "Username updated successfully", username: updatedUser.username });
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
