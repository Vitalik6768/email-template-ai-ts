import { api } from "@/convex/_generated/api";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const SyncUserPage = async() => {
    const userId = await currentUser();
    if (!userId) {
        throw new Error('User not found');
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId.id);
    if (!user.emailAddresses[0]?.emailAddress) {
        return notFound();
    }
    console.log('connecting dsfsd' );

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    try {
        // Insert user into Convex
        await convex.mutation(api.emailTemplate.insertUser, {
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName || ''}`.trim(),
            picture: user.imageUrl || 'default-picture',
            credits: 10,
        });
    } catch (error) {

        console.error('Error inserting user:', error);
        return <p>User insertion failed</p>

        
    }
    
    // Redirect to dashboard regardless of the result
    return redirect('/dashboard');
}

export default SyncUserPage;