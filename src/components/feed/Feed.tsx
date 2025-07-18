import { SideRight } from "components/sideRight/SideRight";
import { useFeed } from "hooks";
import { PostComponent } from "../postComponent/PostComponent";


export function Feed() {
    const { posts, likePost } = useFeed();
    return (
        <div className="w-full h-full flex">
            <div className="w-[82%] h-full flex flex-col items-center py-10 gap-9">
                {posts.map((post) => {
                    return (
                        <PostComponent post={post} likeFunction={likePost} />
                    );
                })}
            </div>
            <div className="w-[18%] h-full">
                <SideRight />
            </div>
        </div>
    );
}