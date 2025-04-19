'use client'

import React from "react";
import HeaderPage from "@/components/headerPage";
import ListPosts from "@/components/post/listPost";

export default function Home() {

    return (
        <div>
            <div>
                <HeaderPage />
            </div>
            <div className="px-60 top-40 max-md:px-2 max-md:top-24 relative pb-6">
                <ListPosts />
            </div>
        </div>
    );
}
