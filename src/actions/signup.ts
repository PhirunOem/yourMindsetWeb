'use server';
import * as z from 'zod';

import { SignupSchema } from '@/utils';

export const signup = async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { name, email, password } = validatedFields.data;
    const payloadData = {
        name: name,
        email: email,
        password: password
    }
    try {
        const signupResponse = await fetch(`${process.env.API_BASE_URL}/account/sign-up/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadData),
        });
        const responseData = await signupResponse.json();
        if (!signupResponse.ok) {
            return {
                message: responseData.message,
                success: false,
            }
        };
        return {
            success: true,
            message: responseData.message
        }
    } catch (error) {
        console.error(error)
        return { error: error }
    }
};
