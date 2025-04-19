"use client";

// library imports
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function Profile() {
    const router = useRouter();
    const pathname = usePathname();

    const { user } = useAuth();


    const [loadingProfile] = useState(false);

    useEffect(() => {
        if (user) {
            // fetch user profile if access token is available
            //   getUserProfile(session.);
            console.log('>>> user signin :::')
        } else {
            // Redirect to `/signin` if no access token or no session
            router.push("/auth/signin?next=" + pathname);
        }
    }, [pathname, router, user]);

    // const getUserProfile = (token: string) => {
    //     setLoadingProfile(true);
    //     fetch(`${baseUrl}/auth/user_profile`, {
    //         headers: { Authorization: "Bearer " + token },
    //     })
    //         .then((response) => {
    //             setLoadingProfile(false);
    //         })
    //         .catch((error) => {
    //             // handle error here
    //             console.error(error);
    //         });
    // };

    return (
        <>
            {" "}
            {loadingProfile ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>User Profile</p>
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                </div>
            )}
        </>
    );
}