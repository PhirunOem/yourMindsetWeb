
import Image from "next/image"
interface QuoteProps {
    imageUrl: string,
    title: string,
    by: string,
    detail: string,
}
export default function Quote({
    imageUrl,
    title,
    by,
    detail
}: QuoteProps) {
    return <div>
        <div>
            <Image src={imageUrl} alt="Quote" width={100} height={100} />
        </div>
        <div>
            <div>
                <p>{title}</p>
            </div>
            <div>
                <p>{by}</p>
            </div><div>
                <p>{detail}</p>
            </div>
        </div>
    </div>
}