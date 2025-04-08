import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function PUT(request: Request) {
    try {
        // Extract only the relevant fields for password update
        // We can add functionality for newUsername later if we want
        const { oldUsername, currentPassword, newPassword } = await request.json();

        // Retrieve the user from the database
        const user = await prisma.user.findUnique({ where: { username: oldUsername } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Ensure newPassword is provided
        if (!newPassword) {
            return NextResponse.json({ message: "New password must be provided" }, { status: 400 });
        }

        // Ensure currentPassword is provided
        if (!currentPassword) {
            return NextResponse.json({ message: "Current password is required" }, { status: 400 });
        }

        // Compare the provided current password to the stored hashed password using bcrypt
        const passwordMatches = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatches) {
            return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
        }

        // Hash the new password using bcrypt
        const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        // Update the user's password in the database
        const updatedUser = await prisma.user.update({
            where: { username: oldUsername },
            data: { password: hashedNewPassword },
        });

        return NextResponse.json(
            { message: "Password updated successfully", username: updatedUser.username },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
