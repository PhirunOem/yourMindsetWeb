"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";


import { useForm, Controller, FormProvider } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'

import TextInput from "../input/TextInput";
import Button from "../button/Button";
import signIn from '@/assets/svgs/signIn.svg'
import { cn, SigninSchema } from "@/utils";
import OrSeparator from "./orSeparator";
import { signin } from "@/actions/signin";
import logo from '@/assets/svgs/logo.svg'
import crossIcon from '@/assets/svgs/cross.svg'
import Link from "next/link";



export default function SignIn() {
    const searchParams = useSearchParams();
    const form = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        async function checkAuthentication() {
            if (authenticated) {
                const next = searchParams.get("next") || "/";
                window.location.href = next;
            }
        }
        checkAuthentication();
    }, [searchParams, authenticated]);

    const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
        setIsSubmitting(true);
        const res = await fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await res.json();
        if (result && !result.success) {
            setError(result.message)
            setIsSubmitting(false)
        } else {
            setIsSubmitting(false)
            setAuthenticated(true)
            setError('')
            return true
        }
    }
    const handleClickSignUp = () => {
        router.push('/auth/signup')
    }
    return (
        <div className="flex flex-col min-h-screen">
            {/* Close Icon */}
            <div className="w-[200px] ml-5 mt-5">
                <Link href={'/'}>
                    <Image src={crossIcon} width={15} height={15} alt="Cross icon" /></Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center justify-center text-center gap-16 px-8 w-full flex-1">

                {/* Left Image (Hidden on mobile) */}
                <div className="hidden md:block">
                    <Image
                        src={signIn}
                        alt="Sign in"
                        width={450}
                        height={450}
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/3 space-y-6">
                    {/* Logo for Mobile */}
                    <div className="flex justify-center items-center md:hidden">
                        <Image src={logo} alt="Logo" width={60} height={60} />
                    </div>

                    {/* Welcome Text */}
                    <div>
                        <p className="text-3xl font-semibold mb-8">Welcome Back</p>
                    </div>

                    {/* Form */}
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <TextInput
                                        {...field}
                                        placeholder="Email"
                                        error={form.formState.errors.email?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <TextInput
                                        {...field}
                                        placeholder="Password"
                                        type="password"
                                        error={form.formState.errors.password?.message}
                                    />
                                )}
                            />
                            <div>
                                <Button
                                    type="submit"
                                    title={isSubmitting ? 'Logging In...' : 'Log In'}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </form>
                    </FormProvider>

                    {/* Or Separator */}
                    <div>
                        <OrSeparator />
                    </div>

                    {/* Sign Up Prompt */}
                    <div>
                        <p>Not yet have account?</p>
                    </div>

                    <div>
                        <Button
                            title="Sign Up"
                            className="text-[#30A5FF] bg-[#D3ECFF]"
                            onClick={handleClickSignUp}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div>
                            <p className="text-red-800">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}