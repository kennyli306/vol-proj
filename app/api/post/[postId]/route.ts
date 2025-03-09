import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request, context: { params: { postId: string } }) {
    const params = await context.params;
    const postId = parseInt(params.postId);
    if (isNaN(postId)) {
        return new NextResponse(JSON.stringify({ error: "Invalid postId" }), { status: 400 });
    }

    const prisma = new PrismaClient();
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });
        if (!post) {
            return new NextResponse(JSON.stringify({ error: "Post not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(post), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return new NextResponse(JSON.stringify({ error: "Error fetching post" }), { status: 500 });
    }
}