import topImage from "@componentsAssets/TopImage/teachgram.png"

export function TopImage() {
    return (
        <div className="w-full flex justify-center">
            <img src={topImage} alt="Teachgram" className="w-full" />
        </div>
    )
}