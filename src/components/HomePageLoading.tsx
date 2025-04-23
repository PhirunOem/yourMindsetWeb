export default function HomePageLoading() {
    return <div className="fixed inset-0 flex items-center justify-center flex-col">
        <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            preload="auto"
            className="bg-[url('https://cdn-icons-png.flaticon.com/512/6172/6172527.png')] bg-center bg-no-repeat bg-contain w-[256px] h-[256px] max-md:w-[100px] max-md:w-[100px]"
        >
            <source
                src="https://cdn-icons-mp4.flaticon.com/512/6172/6172527.mp4"
                type="video/mp4"
            />
        </video>
        <h2 className="font-bold text-2xl max-md:text-sm mt-4 max-md:mt-1">We are loading the best content for you.</h2>
    </div>
}