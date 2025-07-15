import sideImage from "assets/components/SideImage/sideImage.png";

export function SideImage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <img src={sideImage} alt="Right side image" className="w-full h-full" />
        </div>
    );
}