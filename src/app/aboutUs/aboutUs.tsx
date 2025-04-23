import Image from "next/image"
import Link from "next/link";


import aboutUs1 from '@/assets/images/photo_2025-04-23_20-26-10.jpg';
import aboutUs2 from '@/assets/images/photo_2025-04-23_20-26-15.jpg';
import backIcon from "@/assets/svgs/backIcon.svg";

export default function AboutUs() {
    return <div>
        <div className='ml-5 mt-5'>
            <Link href={'/'}>
                <Image
                    src={backIcon}
                    alt="Back Icon"
                    width={30}
                    height={30}
                />
            </Link>
        </div>
        <div className="justify-center items-center content-center flex mt-10 flex-col px-2 text-center">
            <p className="font-bold text-3xl max-md:text-xl">About Us</p>
            <p className="mt-5 text-lg"><strong>Welcome to MINDSET</strong>—a space built on honesty, empathy, and the power of shared experiences.</p>
        </div>
        <div className="flex justify-center items-center mt-10">
            <div className="flex flex-col gap-10 max-md:p-4 w-3/4">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <Image src={aboutUs2} alt="About Us Image 2" width={350} height={350} className="rounded-xl shadow-lg object-cover" />
                    </div>
                    <div className="flex-1 leading-relaxed">
                        We created <span className="font-semibold">MINDSET</span> with one simple goal: to help. Whether you&apos;re navigating anxiety, overcoming depression, or just having a tough day, you&apos;re not alone — and you shouldn't have to feel like you are. Here, anyone seeking mental health support can connect, share, and grow through the stories of others who&apos;ve been there too.
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 max-md:flex-col-reverse">
                    <div className="flex-1 leading-relaxed">
                        This platform is more than just a place to talk—it&apos;s a community built on support, strength, and solidarity. By sharing personal journeys, challenges, and victories, we believe we can create a ripple effect of hope and understanding.
                        <p className="font-bold mt-5">
                            At MINDSET, every voice matters. Your story could be the light someone else needs.
                        </p>
                    </div>
                    <div className="flex-1">
                        <Image src={aboutUs1} alt="About Us Image 1" width={350} height={350} className="rounded-xl shadow-lg object-cover" />
                    </div>
                </div>
            </div>
        </div>


    </div>
}