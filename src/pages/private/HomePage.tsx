import { HomeSideMenu, Loading, Feed, Profile } from "components";
import { useHome } from "hooks/useHome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type component = 'feed' | 'friends' | 'profile' | 'config' | 'createPost';

export function HomePage() {
    const { user, loading } = useHome();
    const [component, setComponent] = useState<component>('feed');
    const navigate = useNavigate();

    function handleComponent() {
        switch (component) {
            case ('feed'): return (<Feed />);
            case ('friends'): return "FRIENDS";
            case ('profile'): return (<Profile />);
            case ('config'):
                navigate("/config");
                return null;
            case ('createPost'): return "CRIAR POST";
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
                        createPostFunction={() => setComponent('createPost')}
                        returnFunction={() => setComponent('feed')}
                        component={component}
                    />
                </div>
                <div className="w-[80%] h-full flex flex-col items-center">
                    {handleComponent()}
                </div>
            </main>
        </>
    );
}