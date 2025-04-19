// import { auth } from "@/auth";

// export async function refreshAccessToken() {
//     const session = await auth();
//     if (!session?.user?.accessToken) return null;

//     try {
//         const response = await fetch('/login/refresh/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             // body: JSON.stringify({ refresh: refreshToken }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to refresh token');
//         }

//         const data = await response.json();
//         return data.access;
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         return null;
//     }
// }
