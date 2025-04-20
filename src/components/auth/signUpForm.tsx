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
        const request_data = {
            name: values.name,
            email: values.email,
            password: values.password,
        }
        try {
            const result = await signup(request_data)
            if (result && !result.success) {
                setError(result.message)
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
        <div className={cn("mx-auto w-[200px] h-screen border-red-100 flex flex-row-reverse",
            "justify-around w-screen items-center justify-center text-center gap-32 px-8",
        )}>
            <div className={cn("max-md:hidden ")}>
                <Image
                    src={signUpImage}
                    alt="Sign in"
                    width={500}
                    height={500}
                />
            </div>
            <div className="w-1/3 space-y-6 max-md:w-3/4">
                <div className="flex justify-center items-center">
                    <Image src={logo} alt={"Logo"} className="w-[60px] h-[60px] max-md:w-[60px] max-md:w-[40px]" />
                </div>
                <div>
                    <p className="text-3xl font-semibold mb-8">Create Account</p>
                </div>
                <div>
                    <p className="font-semibold">Sign up and log in to post your idea.</p>
                </div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <TextInput {...field} placeholder="Username"
                                    error={form.formState.errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <TextInput {...field} placeholder="Email"
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
                                    placeholder={'Password'}
                                    type="password"
                                    error={form.formState.errors.password?.message}
                                />
                            )}
                        />
                        <div>
                            <p>
                                Term and condition
                            </p>
                        </div>
                        <div>
                            <Button title={isSubmitting ? 'Creating your account...' : 'Create'} type="submit" disabled={isSubmitting} />
                        </div>
                    </form>

                </FormProvider>
                <div>
                    <OrSeparator />
                </div>
                <div>
                    <p>
                        Already have an account? <Link href={'/auth/signin'} className="text-[#30A5FF]">Sign in</Link>
                    </p>
                </div>
                {error && <div>
                    <p className="text-red-800">{error}</p>
                </div>}
            </div>
        </div>
    );
}