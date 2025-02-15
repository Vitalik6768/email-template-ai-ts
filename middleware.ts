import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([


  '/dashboard(.*)','/editor(.*)','/','/editor(.*)', // Protect all routes  // You can list other routes you want to protect here

  // '/sign-in(.*)', 
  // '/sign-up(.*)',
  // '/api/(.*)',  // Add API routes to public routes
  // '/api/webhooks/(.*)',  // Add this to be extra specific
  // '/api/clerk-webhook/(.*)'  // Add this to be even more specific
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})





export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}