import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../loading/Loading";
import { useOtherProfile } from "hooks";
import icon from "assets/components/otherProfile/Vector 81.png";

interface OtherProfileProps {
    userId: number
}

export function OtherProfile(props: OtherProfileProps) {
    const { posts, loading, hasMore, user, getPosts, addFriend } = useOtherProfile(props.userId);

    const handleAddFriend = async () => {
        await addFriend();
    }

    return (
        <>
            {loading && <Loading fixed={true} />}
            <main className="w-full py-4 md:p-7 overflow-y-auto" id="scrollableDivProfile">
                <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full flex justify-center md:w-[30%]">
                        <img src={user?.profileLink} alt="Profile image" className="rounded-circle border border-octonary w-[174px] md:w-auto" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center md:items-start md:ml-5">
                        <span className="font-semibold text-quaternary text-[25px]">{user?.name}</span>
                        <span className="text-[20px] text-terciary">{user?.description}</span>
                        <div className="mt-2 hidden md:block">
                            {user?.isFriend ? (
                                <div className="w-1/6 border border-terciary flex items-center p-2 rounded-xl justify-between">
                                    <span className="text-[15px] text-terciary">Amigos</span>
                                    <img src={icon} className="w-[15px]" />
                                </div>
                            ) : (
                                <div className="w-1/6">
                                    <button
                                        className="w-full mt-3 bg-primary rounded-xl p-2 font-semibold text-center text-white text-[15px] shadow cursor-pointer hover:bg-red-800 duration-500 ease-in-out click-decrease-size"
                                        onClick={handleAddFriend}
                                        disabled={loading}
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-4">
                    <div className="w-full md:w-[25%] flex items-center">
                        <div className="w-1/3 md:w-1/2 flex flex-col items-center">
                            <span className="font-bold text-[15px] md:text-[20px] text-quaternary">{user?.totalPosts}</span>
                            <span className="text-[15px] md:text-[20px] text-terciary">Posts</span>
                        </div>
                        <div className="w-1/3 md:w-1/2 flex flex-col items-center border-l border-l-octonary">
                            <span className="font-bold text-[15px] md:text-[20px] text-quaternary">{user?.totalFriends}</span>
                            <span className="text-[15px] md:text-[20px] text-terciary">Amigos</span>
                        </div>
                        <div className="w-1/3 mt-2 block md:hidden">
                            {user?.isFriend ? (
                                <div className="w-[90%] border border-terciary flex items-center p-2 rounded-xl justify-between">
                                    <span className="text-[15px] text-terciary">Amigos</span>
                                    <img src={icon} className="w-[15px]" />
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="w-[90%] mt-3 bg-primary rounded-xl p-2 font-semibold text-center text-white text-[15px] shadow cursor-pointer hover:bg-red-800 duration-500 ease-in-out click-decrease-size"
                                        onClick={handleAddFriend}
                                        disabled={loading}
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full mt-2 flex">
                    <InfiniteScroll
                        className="w-full grid grid-cols-3 gap-2"
                        dataLength={posts.length}
                        next={() => getPosts()}
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