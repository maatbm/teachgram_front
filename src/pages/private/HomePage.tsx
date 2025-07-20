import { HomeSideMenu, Loading, Feed, Profile, CreatePost, Modal, FriendsList } from "components"; // Adicione Modal e FriendsList
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type component = 'feed' | 'profile' | 'config';

export function HomePage() {
    const { user, loading } = useAuth();
    const [component, setComponent] = useState<component>('feed');
    const navigate = useNavigate();
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showFriendsModal, setShowFriendsModal] = useState(false);

    function handleComponent() {
        switch (component) {
            case ('feed'): return (<Feed />);
            case ('profile'): return (<Profile />);
            case ('config'): navigate("/config");
        }
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
                    <FriendsList closeModal={() => setShowFriendsModal(false)} />
                </Modal>
            </main>
        </>
    );
}