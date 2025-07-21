import { SideRight } from "components/sideRight/SideRight";
import { useFeed } from "hooks";
import { PostComponent } from "../postComponent/PostComponent";
import InfiniteScroll from "react-infinite-scroll-component";

interface FeedProps {
    showProfile: (userId: number) => void;
}

export function Feed({ showProfile }: FeedProps) {
    const { posts, likePost, getPosts, hasMore } = useFeed();
    return (
        <div className="w-full h-full flex mt-[15%] md:mt-0 ">
            <div id="scrollableDiv" className="w-full lg:w-[82%] h-full overflow-y-auto">
                <InfiniteScroll className="w-full flex flex-col items-center px-2 py-9 gap-9"
                    dataLength={posts.length}
                    next={getPosts}
                    hasMore={hasMore}
                    loader={<h1 className="text-center text-primary text-[25px] mt-3">Carregando...</h1>}
                    endMessage={<h1 className="text-center text-primary text-[25px] mt-3">Você chegou no final!</h1>}
                    scrollableTarget="scrollableDiv"
                >
                    {posts.map((post) => {
                        return (
                            <PostComponent post={post} likeFunction={likePost} showProfile={showProfile} />
                        );
                    })}
                </InfiniteScroll>
            </div>
            <div className="hidden lg:block w-[18%] h-full">
                <SideRight />
            </div>
        </div>
    );
}