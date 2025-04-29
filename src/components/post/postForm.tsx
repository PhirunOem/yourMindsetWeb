'use client'

import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import TextInput from "../input/TextInput";
import { cn, PostSchema } from "@/utils";
import Button from "../button/Button";
import { createPost } from "@/actions/createPost";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import backIcon from '@/assets/svgs/backIcon.svg';
import { AlertSuccess } from "@/utils/alertSuccess";

export default function PostForm() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: '',
            detail: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof PostSchema>) => {
        setIsSubmitting(true);
        const post_data = {
            title: values.title,
            detail: values.detail,
        };

        try {
            const result = await createPost(post_data);
            if (!result?.success) {
                setIsSubmitting(false);
            } else {
                AlertSuccess('Your post is created successfully.');
                setIsSubmitting(false);
                setError('');
                router.push('/');
                return true;
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-8 bg-white">
            {/* Back Icon - Top Left */}
            <Link href="/" className="absolute top-6 left-6">
                <Image
                    src={backIcon}
                    alt="Back Icon"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                />
            </Link>

            {/* Main Form Container */}
            <div className="w-1/3 space-y-6 max-md:w-full">
                <div className="flex justify-between items-center">
                    <p className="text-3xl font-semibold mb-8">Create your post</p>
                </div>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <TextInput {...field} placeholder="Type your post title here..."
                                    error={form.formState.errors.title?.message}
                                />
                            )}
                        />
                        <Controller
                            name="detail"
                            control={form.control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="Type your detail here..."
                                    maxLength={3000}
                                    minLength={5}
                                    rows={8}
                                    className={cn(
                                        "border-[#BCBCBC] border-[1px] h-[300px]",
                                        "px-[6px] py-[6px] focus:outline-none focus:ring-1 font-poppins w-full",
                                        "overflow-scroll"
                                    )}
                                />
                            )}
                        />
                        <div>

                            <Button
                                type="submit"
                                title={isSubmitting ? 'Creating...' : 'Create'}
                                disabled={isSubmitting}
                            />
                            <div className="text-center items-center mt-8">
                                <p className="text-gray-800 text-xs">Please keep in mind that every ideas you post should be usefull for others by motivating them, help them to solve life obstacle or build themselves.</p>
                            </div>
                        </div>
                    </form>
                </FormProvider>

                {error && (
                    <div>
                        <p className="text-red-800">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
