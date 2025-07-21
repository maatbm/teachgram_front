import homeImage from "assets/components/homeSideMenu/home.png";
import friendsImage from "assets/components/homeSideMenu/friends.png";
import configImage from "assets/components/homeSideMenu/config.png";
import createImage from "assets/components/homeSideMenu/createPost.png";
import defaultUser from "assets/components/homeSideMenu/perfil-de-usuario.png";

interface BottonMenuProps {
    profilePicture?: string;
    feedFunction: () => void;
    friendsFunction: () => void;
    profileFunction: () => void;
    configFunction: () => void;
    createPostFunction: () => void;
}

export function BottonMenu(props: BottonMenuProps) {
    return (
        <div className="w-full flex justify-around items-center p-5 bg-white">
            <img
                src={homeImage}
                role="button"
                onClick={props.feedFunction}
                className="w-[21px]"
            />
            <img
                src={friendsImage}
                role="button"
                onClick={props.friendsFunction}
                className="w-[30px] h-[20px]"
            />
            <img
                src={createImage}
                role="button"
                onClick={props.createPostFunction}
                className="w-[31px]"
            />
            <img
                src={configImage}
                role="button"
                onClick={props.configFunction}
                className="w-[21px] h-[22px]"
            />
            <img
                src={props.profilePicture ? props.profilePicture : defaultUser}
                role="button"
                onClick={props.profileFunction}
                className="w-[32px] rounded-circle"
            />
        </div>
    );
}