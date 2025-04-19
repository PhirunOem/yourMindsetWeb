import Image from "next/image"
import backIcon from '@/assets/svgs/backIcon.svg'
import Link from "next/link"

export default function PrivacyPolicy() {
    return <><div className="bg-gray-200 h-auto font-[Poppins]"></div>
        <div>
            <div className='flex items-center px-10'>
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
                <div className='shrink-0'>
                    <h1 className="lg:text-2xl font-bold text-center py-6">Privacy Policy</h1>
                </div>
                <div className='flex-1'></div>
            </div>
            <div className="flex item-center justify-center ">
                <div className="p-20 bg-white w-[1200px] rounded-lg">
                    <b>Introduction</b>
                    <p className="w-5.5/6">
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data.</p>
                    <b>Information We Collect</b>
                    <ul className="list-circle pl-5">
                        <li className="before:content-['○']"> Email Address: Required for authentication and account management.</li>
                        <li className="before:content-['○']"> User-Generated Content: Posts, comments, and interactions on the platform.</li>
                        <li className="before:content-['○']"> Technical Data: IP address, browser type, and usage analytics.</li>
                    </ul>
                    <b> How We Use Your Information</b>
                    <ul className="list-circle pl-5">
                        <li className="before:content-['○']"> To authenticate users and prevent misuse.</li>
                        <li className="before:content-['○']"> To maintain and improve our platform.</li>
                        <li className="before:content-['○']"> To monitor user activity for security and moderation purposes.</li>
                    </ul>
                    <b>  Data Protection</b>
                    <ul className="list-circle pl-5">
                        <li className="before:content-['○']"> We implement security measures to protect user data.</li>
                        <li className="before:content-['○']"> Email addresses are not publicly visible or shared with third parties</li>
                    </ul>
                    <b> Third-Party Services</b>
                    <ul className="list-circle pl-5">
                        <p>We may use third-party tools (such as analytics services) that collect limited user data for performance improvements.</p>
                    </ul>
                    <b> User Rights</b>
                    <ul className="list-circle pl-5">
                        <li className="before:content-['○']"> Users can request data deletion by contacting us.</li>
                        <li className="before:content-['○']"> Users may opt out of non-essential communications.</li>
                    </ul>
                    <b>Updates to Privacy Policy</b>
                    <p>We may update this Privacy Policy periodically. Users will be notified of significant changes.</p>
                    <b> Contact Us</b>
                    <p>For privacy concerns, contact us at [web.assign21@gmail.com].</p>
                </div>
            </div>
        </div></>

}