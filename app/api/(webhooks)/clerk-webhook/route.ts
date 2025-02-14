import { NextResponse, NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const POST = async (req: NextRequest) => {
    try {
        // Parse the incoming JSON body
        const eventData = await req.json();
        
        // Only process user.created events
        // if (eventData.type !== 'user.created') {
        //     return new NextResponse(JSON.stringify({
        //         message: "Event type not handled",
        //     }), {
        //         status: 200,
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        // }

        console.log(eventData)

        
        // const userData = eventData.data;
        const email = eventData.email
        const name = eventData.name || '';
        const picture = eventData.picture || '';
        const credits = eventData.credits || '';


        // const userData = eventData.data;
        // const email = userData.email_addresses?.[0]?.email_address;
        // const firstName = userData.first_name || '';
        // const lastName = userData.last_name || '';
        // const imageUrl = userData.image_url || '';

        // Ensure necessary fields are present
        // if (!eventData || !email) {
        //     return new NextResponse(JSON.stringify({
        //         message: "Required user data is missing",
        //     }), {
        //         status: 400,
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        // }

        // Insert the new user using Convex mutation
        const result = await convex.mutation(api.emailTemplate.insertUser, {
            email: email,
            name: name,
            picture: picture,
            credits: 10,
        });

        // Handle case when user already exists
        if (result === false) {
            return new NextResponse(JSON.stringify({
                message: "User already exists",
                success: false
            }), {
                status: 409, // Conflict status code
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new NextResponse(JSON.stringify({
            message: "User data inserted successfully",
            data: result,
            success: true
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new NextResponse(JSON.stringify({
            message: "Error inserting user data",
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}