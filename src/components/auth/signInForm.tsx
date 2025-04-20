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
        setIsSubmitting(true)
        const result = await signin(values)
        if (result && !result.success) {
            setError(result.message)
            setIsSubmitting(false)
        } else {
            setIsSubmitting(false)
            // setAuthenticated(true)
            setError('')
            // return true
            window.location.href = '/';
        }
    };
    const handleClickSignUp = () => {
        router.push('/auth/signup')
    }
    return (
        <div className={cn("mx-auto w-[200px] h-screen border-red-100 flex",
            "justify-around w-screen items-center justify-center text-center gap-32 px-8",
        )}>
            <div className={cn("max-md:hidden ")}>
                <Image
                    src={signIn}
                    alt="Sign in"
                    width={450}
                    height={450}
                />
            </div>
            <div className="w-1/3 space-y-6 max-md:w-3/4">
                <div className="flex justify-center items-center lg:hidden">
                    <Image src={logo} alt={"Logo"} className="w-[60px] h-[60px] max-md:w-[60px] max-md:w-[40px]" />
                </div>
                <div>
                    <p className="text-3xl font-semibold mb-8">Welcome Back</p>
                </div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <Button type="submit" title={isSubmitting ? 'Logging In...' : 'Log In'} disabled={isSubmitting} />
                        </div>
                    </form>
                </FormProvider>
                <div>
                    <OrSeparator />
                </div>
                <div>
                    <p>Not yet have account ?</p>
                </div>
                <div>
                    <Button title="Sign Up" className="text-[#30A5FF] bg-[#D3ECFF]" onClick={handleClickSignUp} />
                </div>
                {error && <div>
                    <p className="text-red-800">{error}</p>
                </div>}
            </div>
        </div>
    );
}