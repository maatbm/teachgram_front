import { TopImage } from "components";
import homeImage from "assets/components/homeSideMenu/home.png";
import friendsImage from "assets/components/homeSideMenu/friends.png";
import configImage from "assets/components/homeSideMenu/config.png";
import createImage from "assets/components/homeSideMenu/createPost.png";
import defaultUser from "assets/components/homeSideMenu/perfil-de-usuario.png";

interface HomeSideMenuProps {
    profilePicture?: string;
    feedFunction: () => void;
    friendsFunction: () => void;
    profileFunction: () => void;
    configFunction: () => void;
    createPostFunction: () => void;
}

export function HomeSideMenu(props: HomeSideMenuProps) {
    return (
        <div className="w-full h-full flex flex-col p-8 gap-5 items-center">
            <TopImage />
            <div
                className="w-full p-3 flex items-center gap-5 border border-senary mt-3 rounded-[15px] hover-background-gray cursor-pointer click-decrease-size shadow-md"
                role="button"
                onClick={props.feedFunction}
            >
                <img src={homeImage} alt="Home image" className="w-[29px] h-[29px]" />
                <span className="hidden lg:inline text-[20px] text-septenary whitespace-nowrap">Feed</span>
            </div>
            <div
                className="w-full p-3 flex items-center gap-5 border border-senary mt-3 rounded-[15px] hover-background-gray cursor-pointer click-decrease-size shadow-md"
                role="button"
                onClick={props.friendsFunction}
            >
                <img src={friendsImage} alt="Home image" className="w-[29px] h-[18px]" />
                <span className="hidden lg:inline text-[20px] text-septenary whitespace-nowrap">Amigos</span>
            </div>
            <div
                className="w-full p-2 flex items-center gap-5 border border-senary mt-3 rounded-[15px] hover-background-gray cursor-pointer click-decrease-size shadow-md"
                role="button"
                onClick={props.profileFunction}
            >
                <img src={props.profilePicture || defaultUser} alt="Home image" className="w-[40px] h-[40px] rounded-circle" />
                <span className="hidden lg:inline text-[20px] text-septenary whitespace-nowrap">Perfil</span>
            </div>
            <div
                className="w-full p-3 flex items-center gap-5 border border-senary mt-3 rounded-[15px] hover-background-gray cursor-pointer click-decrease-size shadow-md"
                role="button"
                onClick={props.configFunction}
            >
                <img src={configImage} alt="Home image" className="w-[29px] h-[29px]" />
                <span className="hidden lg:inline text-[20px] text-septenary whitespace-nowrap overflow-hidden text-ellipsis">Configurações</span>
            </div>
            <div
                className="w-full p-3 flex items-center gap-5 border border-senary mt-3 rounded-[15px] hover-background-gray cursor-pointer click-decrease-size shadow-md"
                role="button"
                onClick={props.createPostFunction}
            >
                <img src={createImage} alt="Home image" className="w-[29px] h-[29px]" />
                <span className="hidden lg:inline text-[20px] text-septenary whitespace-nowrap">Criar</span>
            </div>
        </div>
    );
}