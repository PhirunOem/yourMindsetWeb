export default function HomePageLoading() {
    return <div className="fixed inset-0 flex items-center justify-center flex-col">
        <video
            width={256}
            height={256}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="bg-[url('https://cdn-icons-png.flaticon.com/512/6172/6172527.png')] bg-center bg-no-repeat bg-contain"
        >
            <source
                src="https://cdn-icons-mp4.flaticon.com/512/6172/6172527.mp4"
                type="video/mp4"
            />
        </video>
        <h2 className="font-bold text-2xl max-md:text-sm mt-4">We are loading the best content for you.</h2>
    </div>
}