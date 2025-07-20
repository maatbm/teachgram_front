import { HomeSideMenu, Loading, Feed, Profile, CreatePost, Modal, FriendsList, OtherProfile } from "components";
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
            case ('feed'): return (<Feed showProfile={handleShowProfile}/>);
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
                <div className="w-[20%] h-full">
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
                <div className="w-[80%] h-full flex flex-col items-center">
                    {handleComponent()}
                </div>
                <CreatePost showModal={showCreatePostModal} close={() => setShowCreatePostModal(false)} />
                <Modal open={showFriendsModal}>
                    <FriendsList closeModal={() => setShowFriendsModal(false)} showProfile={handleShowProfile} />
                </Modal>
            </main>
        </>
    );
}