import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
    const formData = await req.formData();
    const data = {
        title: formData.get('title') as string,
        organization: formData.get('organization') as string,
        location: formData.get('location') as string,
        description: formData.get('description') as string
    };

    const prisma = new PrismaClient();
    console.log("Request Data:", data);

    try {
        const post = await prisma.post.create({
            data: {
                title: data.title,
                organization: data.organization,
                location: data.location,
                description: data.description,
            },
        });
        console.log("Post created:", post);
        return new NextResponse(JSON.stringify(post), { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return new NextResponse(JSON.stringify({ error: "Error creating post" }), { status: 500 });
    }
}