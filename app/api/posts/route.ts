import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const distance = Number(searchParams.get('distance'));
    console.log(distance);

    const latitude = 42.2808;
    const longitude = -83.7430;

    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                latitude: true,
                longitude: true,
            },
        });

        const filteredPosts = posts.filter((post) => {
            if (distance === 0) {
                return true;
            } else if (post.latitude !== null && post.longitude !== null) {
                return isInDistance(post.latitude, post.longitude, latitude, longitude, distance);
            }
            return false;
        });

        return new NextResponse(JSON.stringify(filteredPosts), {
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


    };

    try {
        console.log("Data received:", data);
        const post = await prisma.post.create({
            data: {
                title: formData.get('title') as string,
                organization: formData.get('organization') as string,
                description: formData.get('description') as string,

                address: formData.get('address') as string,
                latitude: Number(formData.get('latitude') as string),
                longitude: Number(formData.get('longitude') as string),
                street_number: formData.get('streetNumber') as string,
                street_name: formData.get('streetName') as string,
                neighborhood: formData.get('neighborhood') as string,
                city: formData.get('city') as string,
                county: formData.get('county') as string,
                state: formData.get('state') as string,
                country: formData.get('country') as string,
                postal_code: formData.get('postalCode') as string,

                owner: formData.get('username') as string
            },
        });
        return new NextResponse(JSON.stringify(post), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error creating post" }), { status: 500 });
    }
}

function isInDistance(lat1: number, lon1: number, lat2: number, lon2: number, distance: number) {
    const earthRadius = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInMiles = earthRadius * c;
    return distanceInMiles <= distance;
}