import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
            },
        });
        return new NextResponse(JSON.stringify(posts), {
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

export async function POST(req: Request) {
    const formData = await req.formData();
    const data = {
        title: formData.get('title') as string,
        organization: formData.get('organization') as string,
        location: formData.get('location') as string,
        description: formData.get('description') as string,
        username: formData.get('username') as string
    };

    try {
        const post = await prisma.post.create({
            data: {
                title: data.title,
                organization: data.organization,
                location: data.location,
                description: data.description,
                creator_name: data.username
            },
        });
        return new NextResponse(JSON.stringify(post), { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return new NextResponse(JSON.stringify({ error: "Error creating post" }), { status: 500 });
    }
}