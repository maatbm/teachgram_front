import { useProfile } from "hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../loading/Loading";
import { useAuth } from "contexts/AuthContext";

export function Profile() {
    const { posts, loading, getUserPosts, hasMore, totalPosts } = useProfile();
    const { user } = useAuth();

    return (
        <>
            {loading && <Loading fixed={true} />}
            <main className="w-full p-7 overflow-y-auto" id="scrollableDivProfile">
                <div className="w-full flex">
                    <div className="w-[30%]">
                        <img src={user?.profileLink} alt="Profile image" className="rounded-circle border border-octonary" />
                    </div>
                    <div className="w-full flex flex-col justify-center ml-5">
                        <span className="font-semibold text-quaternary text-[25px]">{user?.name}</span>
                        <span className="text-[20px] text-terciary">{user?.description}</span>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-[25%] flex">
                        <div className="w-1/2 flex flex-col items-center">
                            <span className="font-bold text-[20px] text-quaternary">{totalPosts}</span>
                            <span className="text-[20px] text-terciary">Posts</span>
                        </div>
                        <div className="w-1/2 flex flex-col items-center border-l border-l-octonary">
                            <span className="font-bold text-[20px] text-quaternary">100</span>
                            <span className="text-[20px] text-terciary">Amigos</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-2 flex">
                    <InfiniteScroll
                        className="w-full grid grid-cols-3 gap-2"
                        dataLength={posts.length}
                        next={() => user && getUserPosts(user.id)}
                        hasMore={hasMore}
                        loader={<h1 className="text-center text-primary text-[25px] mt-3">Carregando...</h1>}
                        endMessage={<h1 className="text-center text-primary text-[25px] mt-3">Você chegou no final!</h1>}
                        scrollableTarget="scrollableDivProfile"
                    >
                        {posts.map((post) => (
                            <div key={post.id || post.photoLink} className="aspect-square">
                                {post.photoLink && (
                                    <img
                                        src={post.photoLink}
                                        className="w-full h-full object-cover"
                                        alt="Post"
                                    />
                                )}
                                {post.videoLink && (
                                    <video
                                        src={post.videoLink}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </main>
        </>
    );
}