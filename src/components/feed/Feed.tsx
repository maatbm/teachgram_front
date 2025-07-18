import { SideRight } from "components/sideRight/SideRight";

export function Feed() {
    return (
        <div className="w-full h-full flex">
            <div className="w-[82%] h-full"></div>
            <div className="w-[18%] h-full">
                <SideRight />
            </div>
        </div>
    );
}