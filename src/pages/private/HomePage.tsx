import { HomeSideMenu, Loading, Feed, Profile, CreatePost } from "components";
import { useHome } from "hooks/useHome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type component = 'feed' | 'friends' | 'profile' | 'config';

export function HomePage() {
    const { user, loading } = useHome();
    const [component, setComponent] = useState<component>('feed');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    function handleComponent() {
        switch (component) {
            case ('feed'): return (<Feed />);
            case ('friends'): return "FRIENDS";
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
                        friendsFunction={() => setComponent('friends')}
                        profileFunction={() => setComponent('profile')}
                        configFunction={() => setComponent('config')}
                        createPostFunction={() => setShowModal(true)}
                        returnFunction={() => setComponent('feed')}
                        component={component}
                    />
                </div>
                <div className="w-[80%] h-full flex flex-col items-center">
                    {handleComponent()}
                </div>
                <CreatePost showModal={showModal} close={() => setShowModal(false)} />
            </main>
        </>
    );
}