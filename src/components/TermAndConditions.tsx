import Image from 'next/image';
import backIcon from "@/assets/svgs/backIcon.svg";
import Link from 'next/link';
export default function TermAndConditions() {
    return <div className="h-auto font-[Poppins] items-center justify-center ">
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
                <h1 className="lg:text-2xl font-bold text-center py-6"> Terms and Conditions</h1>
            </div>
            <div className='flex-1'></div>
        </div>
        <br />
        <br />
        <div className="">
            <div className="bg-white  px-10 rounded-lg">
                <b>Introduction</b>
                <p className="">
                    Welcome to <b>Mindset</b> ("we," "our," or "us"). These Terms and Conditions govern your use of our platform, which allows users to share their thoughts and experiences anonymously about mental health. By using our website, you agree to comply with these terms.
                </p>
                <b>User Eligibility</b>
                <p className=" ">
                    You must be at least 13 years old to use our platform. By using this website, you confirm that you meet this age requirement.</p>
                <b> Account Registration</b>
                <ul className="list-circle ">
                    <li className="before:content-['○']"> Users must register using a valid email for authentication.</li>
                    <li className="before:content-['○']"> You are responsible for maintaining the confidentiality of your account information.</li>
                    <li className="before:content-['○']"> We reserve the right to suspend or terminate accounts that violate these terms.</li>
                </ul>
                <b>  User Conduct</b>
                <ul className="list-circle ">
                    <li className="before:content-['○']"> Users must not post harmful, offensive, or illegal content.</li>
                    <li className="before:content-['○']"> Hate speech, harassment, or any form of discrimination is strictly prohibited.</li>
                    <li className="before:content-['○']"> Do not share personal information that could identify yourself or others.</li>
                    <li className="before:content-['○']"> Users must respect others' anonymity and privacy.</li>
                </ul>
                <b> Content Ownership and Rights</b>
                <ul className="list-circle ">
                    <li className="before:content-['○']"> Users retain ownership of their posts but grant us a non-exclusive license to display and distribute the content on our platform.</li>
                    <li className="before:content-['○']"> We reserve the right to remove any content that violates our policies.</li>
                </ul>
                <b> Privacy and Data Collection</b>
                <ul className="list-circle ">
                    <li className="before:content-['○']"> We collect and store email addresses for authentication purposes only.</li>
                    <li className="before:content-['○']"> For more details on how we handle user data, refer to our Privacy Policy.</li>
                </ul>
                <b>Liability Disclaimer</b>
                <ul className="list-circle ">
                    <li className="before:content-['○']"> The platform is provided "as-is" without warranties.</li>
                    <li className="before:content-['○']"> We do not provide medical advice. If you are in crisis, please seek professional help.</li>
                    <li className="before:content-['○']"> We are not responsible for user-generated content or interactions.</li>
                </ul>
                <b> Changes to Terms</b>
                <p>We reserve the right to update these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of any modifications.</p>
                <b> Contact Us</b><p>If you have any questions regarding these terms, contact us at [web.assign21@gmail.com].</p>
            </div>
        </div>
    </div>

}