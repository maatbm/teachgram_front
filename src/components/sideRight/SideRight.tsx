import image from "assets/components/sideRight/Group 8047.png";

export function SideRight() {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <img src={image} alt="Side right image" className="w-full h-[25%]" />
            <img src={image} alt="Side right image" className="w-full h-[25%]" />
            <img src={image} alt="Side right image" className="w-full h-[25%]" />
            <img src={image} alt="Side right image" className="w-full h-[25%]" />
        </div>
    );
}