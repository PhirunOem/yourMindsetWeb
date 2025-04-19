import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import notFoundImage from '@/assets/images/notFound.png'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Image src={notFoundImage} alt='Not Found Image' width={500} height={500} />
            <h1 className="font-bold mt-4 text-6xl">404</h1>
            <h2 className="mb-4 text-2xl">Oops! Page Not Found</h2>
            <p>
                The page you&apos;re looking for doesn&apos;t exist.<br /> Please go back to homepage by click on
                <Link href="/" className="text-blue-500 hover:underline">
                    {''}  this link
                </Link>
            </p>

        </div>
    )
}
