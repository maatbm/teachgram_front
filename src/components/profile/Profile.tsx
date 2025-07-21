import { useProfile } from "hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../loading/Loading";
import { useAuth } from "contexts/AuthContext";

export function Profile() {
    const { posts, loading, loadMorePosts, hasMore } = useProfile();
    const { user } = useAuth();

    return (
        <>
            {loading && <Loading fixed={true} />}
            <main className="w-full py-4 md:p-7 overflow-y-auto" id="scrollableDivProfile">
                <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full md:w-[30%] flex justify-center">
                        <img src={user?.profileLink} alt="Profile image" className="rounded-circle border border-octonary w-1/2 md:w-full" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center md:items-start md:ml-5">
                        <span className="font-semibold text-quaternary text-[15px] md:text-[25px] my-4">{user?.name}</span>
                        <span className="text-[15px] md:text-[20px] text-terciary">{user?.description}</span>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-3">
                    <div className="w-full md:w-[25%] flex">
                        <div className="w-1/2 flex flex-col items-center">
                            <span className="font-bold text-[15px] md:text-[20px] text-quaternary">{user?.totalPosts}</span>
                            <span className="text-[15px] md:text-[20px] text-terciary">Posts</span>
                        </div>
                        <div className="w-1/2 flex flex-col items-center border-l border-l-octonary">
                            <span className="font-bold text-15px md:text-[20px] text-quaternary">{user?.totalFriends}</span>
                            <span className="text-[15px] md:text-[20px] text-terciary">Amigos</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-3 flex">
                    <InfiniteScroll
                        className="w-full grid grid-cols-3 gap-1 md:gap-2"
                        dataLength={posts.length}
                        next={() => user && loadMorePosts()}
                        hasMore={hasMore}
                        loader={<h1 className="text-center text-primary text-[15px] md:text-[25px] mt-3">Carregando...</h1>}
                        endMessage={<h1 className="text-center text-primary text-15px md:text-[25px] mt-3">Você chegou no final!</h1>}
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