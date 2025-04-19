import React, { Suspense } from 'react';

import Signin from '@/app/auth/signin/SignIn';

export default function page() {
    return (
        <Suspense>
            <Signin />
        </Suspense>
    );
}
