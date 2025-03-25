import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    try {
        const { oldUsername, newUsername, currentPassword, newPassword } = await request.json();
        const user = await prisma.user.findUnique({ where: { username: oldUsername } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (newPassword) {
            if (!currentPassword || currentPassword !== user.password) {
                return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
            }
        }

        if (oldUsername !== newUsername) {
            const duplicate = await prisma.user.findUnique({ where: { username: newUsername } });
            if (duplicate) {
                return NextResponse.json({ message: "Username already taken" }, { status: 400 });
            }
        }

        const updatedUser = await prisma.user.update({
            where: { username: oldUsername },
            data: {
                username: newUsername,
                ...(newPassword && { password: newPassword }),
            },
        });

        return NextResponse.json({ message: "Updated", username: updatedUser.username });
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
