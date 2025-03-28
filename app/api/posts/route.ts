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
        description: formData.get('description') as string,

        address: formData.get('address') as string,
        street_number: formData.get('streetNumber') as string,
        street_name: formData.get('streetName') as string,
        neighborhood: formData.get('neighborhood') as string,
        city: formData.get('city') as string,
        county: formData.get('county') as string,
        state: formData.get('state') as string,
        country: formData.get('country') as string,
        postal_code: formData.get('postalCode') as string
    };

    try {
        console.log("Data received:", data);
        const post = await prisma.post.create({
            data: {
                title: data.title,
                organization: data.organization,
                description: data.description,

                address: data.address,
                street_number: data.street_number,
                street_name: data.street_name,
                neighborhood: data.neighborhood,
                city: data.city,
                county: data.county,
                state: data.state,
                country: data.country,
                postal_code: data.postal_code
            },
        });
        return new NextResponse(JSON.stringify(post), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error creating post" }), { status: 500 });
    }
}