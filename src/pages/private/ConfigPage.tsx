import { SideRight, ConfigInitial, EditProfile, EditAccount } from "components";
import { useState } from "react";

type component = 'initial' | 'accountConfig' | 'editProfile';

export function ConfigPage() {
    const [component, setComponent] = useState<component>('initial');

    function handleComponent() {
        switch (component) {
            case ('initial'): return (<ConfigInitial setAccountConfig={() => setComponent('accountConfig')} setEditprofile={() => setComponent('editProfile')} />);
            case ('accountConfig'): return (<EditAccount returnFunction={() => setComponent('initial')} />);
            case ('editProfile'): return (<EditProfile />);
        }
    }

    return (
        <main className="w-full h-full flex overflow-hidden">
            <div className="w-full h-full">
                {handleComponent()}
            </div>
            <div className="hidden md:block w-[18%] h-full">
                <SideRight />
            </div>
        </main>
    );
}