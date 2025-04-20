'use server';
import * as z from 'zod';

import { SigninSchema } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signin = async (values: z.infer<typeof SigninSchema>, next = '/') => {
  const cookieStore = await cookies()
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/account/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Something went wrong.'
      }
    }
    cookieStore.set("accessToken", data?.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    redirect(next)

  } catch (err) {
    console.error("Login error", err);
  }
};
