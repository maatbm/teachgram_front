import { HomeSideMenu, Loading, Feed, Profile } from "components";
import { useHome } from "hooks/useHome";
import { useState } from "react";

type component = 'feed' | 'friends' | 'profile' | 'config' | 'createPost';

export function HomePage() {
    const { user, loading } = useHome();
    const [component, setComponent] = useState<component>('feed');

    function handleComponent() {
        switch (component) {
            case ('feed'): return (<Feed />);
            case ('friends'): return "FRIENDS";
            case ('profile'): return (<Profile />);
            case ('config'): return "CONFIG";
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
                    />
                </div>
                <div className="w-[80%] h-full flex flex-col items-center">
                    {handleComponent()}
                </div>
            </main>
        </>
    );
}