import { HomeSideMenu, Loading, Feed, Profile, CreatePost, Modal, FriendsList, OtherProfile, TopImage, BottonMenu, ReturnButton } from "components";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type component = 'feed' | 'profile' | 'config' | 'otherProfile';

export function HomePage() {
    const { user, loading } = useAuth();
    const [component, setComponent] = useState<component>('feed');
    const [otherProfileId, setOtherProfileId] = useState<number | null>(null);
    const navigate = useNavigate();
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showFriendsModal, setShowFriendsModal] = useState(false);

    function handleComponent() {
        switch (component) {
            case ('feed'): return (<Feed showProfile={handleShowProfile} />);
            case ('profile'): return (<Profile />);
            case ('config'): navigate("/config"); break;
            case ('otherProfile'):
                if (otherProfileId) {
                    return <OtherProfile userId={otherProfileId} />
                }
        }
    }

    function handleShowProfile(userId: number) {
        setOtherProfileId(userId);
        setComponent('otherProfile');
        setShowFriendsModal(false);
    }

    return (
        <>
            {loading && <Loading fixed={true} />}
            <main className="w-full h-full flex">
                <div className="hidden w-[20%] h-full md:block">
                    <HomeSideMenu
                        profilePicture={user?.profileLink}
                        feedFunction={() => setComponent('feed')}
                        friendsFunction={() => setShowFriendsModal(true)}
                        profileFunction={() => setComponent('profile')}
                        configFunction={() => setComponent('config')}
                        createPostFunction={() => setShowCreatePostModal(true)}
                        returnFunction={() => setComponent('feed')}
                        component={component}
                    />
                </div>
                <div className="w-full md:w-[80%] h-full flex flex-col items-center p-2 md:p-0">
                    {handleComponent()}
                </div>
                <CreatePost showModal={showCreatePostModal} close={() => setShowCreatePostModal(false)} />
                <Modal open={showFriendsModal}>
                    <FriendsList closeModal={() => setShowFriendsModal(false)} showProfile={handleShowProfile} />
                </Modal>

                {component != 'feed' &&
                    <div className="w-full fixed top-0 left-0 p-4 md:hidden">
                        <ReturnButton function={() => setComponent('feed')} />
                    </div>
                }

                {component === 'feed' &&
                    <>
                        <div className="w-full p-4 shadow-sm fixed top-0 left-0 bg-white md:hidden">
                            <div className="w-[60%]">
                                <TopImage />
                            </div>
                        </div>
                        <div className="w-full fixed bottom-0 left-0 shadow-md md:hidden">
                            <BottonMenu
                                profilePicture={user?.profileLink}
                                feedFunction={() => setComponent('feed')}
                                friendsFunction={() => setShowFriendsModal(true)}
                                profileFunction={() => setComponent('profile')}
                                configFunction={() => setComponent('config')}
                                createPostFunction={() => setShowCreatePostModal(true)}
                            />
                        </div>
                    </>
                }
            </main>
        </>
    );
}