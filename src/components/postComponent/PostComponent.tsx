import image from "assets/components/feed/Group 8100.png";
import type { PostResponse } from "services/postService/post.types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LikeBUtton } from "../button/LikeButton";

interface PostComponentProps {
    post: PostResponse;
    likeFunction: (postId: number) => void;
}

export function PostComponent(props: PostComponentProps) {

    return (
        <div className="w-[75%] shadow-lg p-4 rounded-2xl border border-septenary" key={props.post.id}>
            <div className="w-full flex">
                <div className="w-[74px]">
                    <img src={props.post.user.profileLink} alt="Profile image" className="rounded-circle" />
                </div>
                <div className="w-full ml-3 flex flex-col justify-center">
                    <span className="text-[25px] text-septenary">{props.post.user.username}</span>
                    <span className="text-[20px] text-septenary">{formatDistanceToNow(new Date(props.post.createdAt), { addSuffix: true, locale: ptBR })}</span>
                </div>
                <div className="w-[5%]">
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="w-full mt-3">
                <span className="text-[20px] text-septenary">{props.post.description}</span>
            </div>
            {props.post.photoLink &&
                <div className="w-full flex justify-center mt-3">
                    <img src={props.post.photoLink} alt="Post photo" className="rounded-2xl" />
                </div>
            }
            {props.post.videoLink &&
                <div className="w-full flex justify-center mt-3">
                    <video src={props.post.videoLink} className="rounded-2xl w-full" controls />
                </div>
            }
            <div className="w-full flex gap-5 mt-3">
                <LikeBUtton buttonFunction={() => props.likeFunction(props.post.id)} />
                <span className="text-[20px] text-septenary">{props.post.likes} curtidas</span>
            </div>
        </div>
    );
}