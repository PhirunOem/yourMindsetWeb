'use client'

import React, { use } from 'react'
import ProfilePage from './Profile'

const Page = (props: { params: Promise<{ id: string }> }) => {
    const { id } = use(props.params)

    return (
        <div>
            <ProfilePage userId={id} />
        </div>
    )
}

export default Page
