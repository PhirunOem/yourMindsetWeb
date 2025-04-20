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
import Image from "next/image"
import backIcon from '@/assets/svgs/backIcon.svg'

export default function PostForm() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: '',
            detail: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof PostSchema>) => {
        setIsSubmitting(true)
        const post_data = {
            title: values.title,
            detail: values.detail,
        }
        try {
            const result = await createPost(post_data)
            if (!result?.success) {
                // setError(result.error)
                setIsSubmitting(false)
            } else {
                setIsSubmitting(false)
                setError('')
                router.push('/')
                return true
            }
        } catch (error) {
            setIsSubmitting(false)
            console.error(error)
        }
    };

    return <div className={cn("mx-auto w-[200px] h-screen border-red-100 flex",
        "justify-around w-screen items-center justify-center text-center gap-32 px-8",
    )}>
        <div className="w-1/3 space-y-6 max-md:w-3/4">
            <div className='flex-1'>
                <Link href={'/'}>
                    <Image
                        src={backIcon}
                        alt="Back Icon"
                        width={30}
                        height={30}
                    />
                </Link>
            </div>
            <div className="flex justify-between items-cente">
                <p className="text-3xl font-semibold mb-8">Create your post</p>
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <TextInput {...field} placeholder="Title"
                                error={form.formState.errors.title?.message}
                            />
                        )}
                    />
                    <Controller
                        name="detail"
                        control={form.control}
                        render={({ field }) => (
                            <textarea {...field} placeholder="Type your detail here..." maxLength={250} minLength={5}
                                className={cn("border-[#BCBCBC] border-[1px] h-[300px]",
                                    " px-[6px] py-[6px] focus:outline-none focus:ring-1 font-poppins w-full",
                                    "overflow-hidden resize-none"
                                )}
                            ></textarea>
                        )}
                    />
                    <div>
                        <Button type="submit" title={isSubmitting ? 'Creating...' : 'Create'} disabled={isSubmitting} />
                    </div>
                </form>
            </FormProvider>
            {error && <div>
                <p className="text-red-800">{error}</p>
            </div>}
        </div>
    </div>
}