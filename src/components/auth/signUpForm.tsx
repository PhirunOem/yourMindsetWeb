"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm, Controller, FormProvider } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'


import { signup } from "@/actions/signup";
import TextInput from "../input/TextInput";
import Button from "../button/Button";
import signUpImage from '@/assets/svgs/signUp.svg'
import logo from '@/assets/svgs/logo.svg'
import { cn, SignupSchema } from "@/utils";
import OrSeparator from "./orSeparator";
import Link from "next/link";
import crossIcon from '@/assets/svgs/cross.svg'


export default function SignUpForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


    const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
        setIsSubmitting(true)
        setError('')

        if (typeof document !== 'undefined') {
            const active = document.activeElement as HTMLElement | null;
            active?.blur();
        }
        const request_data = {
            name: values.name,
            email: values.email,
            password: values.password,
        }
        try {
            const result = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request_data),
            });
            const data = await result.json();
            if (data && !data.success) {
                setError(data.message)
                setIsSubmitting(false)
            } else {
                router.push('/auth/signin')
                setIsSubmitting(false)
                setError('')
            }
        } catch (error) {
            setIsSubmitting(false)
            console.error(error)
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Cross Icon */}
            <div className="w-[200px] ml-5 mt-5">
                <Link href="/">
                    <Image src={crossIcon} width={15} height={15} alt="Cross icon" />
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center text-center gap-16 px-8 w-full flex-1">

                {/* Right Image (Hidden on mobile) */}
                <div className="hidden md:block">
                    <Image
                        src={signUpImage}
                        alt="Sign up"
                        width={500}
                        height={500}
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/3 space-y-6">
                    {/* Logo */}
                    <div className="flex justify-center items-center">
                        <Image src={logo} alt="Logo" width={60} height={60} />
                    </div>

                    {/* Headings */}
                    <div>
                        <p className="text-3xl font-semibold mb-8">Create Account</p>
                    </div>

                    <div>
                        <p className="font-semibold">Sign up and log in to post your idea.</p>
                    </div>

                    {/* Form */}
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <TextInput
                                        {...field}
                                        placeholder="Username"
                                        error={form.formState.errors.name?.message}
                                    />
                                )}
                            />
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

                            {/* Terms Link */}
                            <div>
                                <Link href="/termAndConditions" className="underline">
                                    Terms and Conditions
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <Button
                                    title={isSubmitting ? 'Creating your account...' : 'Create'}
                                    type="submit"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </form>
                    </FormProvider>

                    {/* Or Separator */}
                    <div>
                        <OrSeparator />
                    </div>

                    {/* Already have account */}
                    <div>
                        <p>
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="text-[#30A5FF]">
                                Sign in
                            </Link>
                        </p>
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