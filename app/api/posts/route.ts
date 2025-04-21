import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = 9;

    const searchTerm = searchParams.get('searchTerm')?.toLowerCase() || '';
    const distance = Number(searchParams.get('distance'));
    const city = searchParams.get('city')?.toLowerCase() || '';
    const county = searchParams.get('county')?.toLowerCase() || '';
    const state = searchParams.get('state')?.toLowerCase() || '';

    const latitude = 42.2808;
    const longitude = -83.7430;

    try {
        let posts = await prisma.post.findMany({
            select: {
                id: true,
                title: searchTerm !== '',
                organization: searchTerm !== '',
                description: searchTerm !== '',
                latitude: distance !== 0,
                longitude: distance !== 0,
            },
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { organization: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                ],
                AND: [
                    city ? { city: { contains: city, mode: 'insensitive' } } : {},
                    county ? { county: { contains: county, mode: 'insensitive' } } : {},
                    state ? { state: { contains: state, mode: 'insensitive' } } : {},
                ],

            },
        });

        /* Distance */
        posts = posts.filter((post) => {
            if (distance === 0) {
                return true;
            } else if (post.latitude !== null && post.longitude !== null) {
                return isInDistance(post.latitude, post.longitude, latitude, longitude, distance);
            }
            return false;
        });

        /* Pagination */
        const totalPosts = posts.length;
        const totalPages = Math.ceil(totalPosts / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        posts = posts.slice(startIndex, endIndex);
        return new NextResponse(
            JSON.stringify({
                page,
                totalPages,
                startIndex,
                totalPosts,
                posts,
            }),
            {
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

    try {
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

                owner_email: formData.get('email') as string,
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