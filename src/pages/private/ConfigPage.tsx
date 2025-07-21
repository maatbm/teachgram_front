import { SideRight, ReturnButton, ConfigInitial, EditProfile, EditAccount } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type component = 'initial' | 'accountConfig' | 'editProfile';

export function ConfigPage() {
    const navigate = useNavigate();
    const [component, setComponent] = useState<component>('initial');

    function handleComponent() {
        switch (component) {
            case ('initial'): return (<ConfigInitial setAccountConfig={() => setComponent('accountConfig')} setEditprofile={() => setComponent('editProfile')} />);
            case ('accountConfig'): return (<EditAccount />);
            case ('editProfile'): return (<EditProfile />);
        }
    }

    return (
        <main className="w-full h-full flex flex-col md:grid md:grid-cols-[10%_1fr_18%] lg:grid-cols-[10%_1fr_18%] overflow-hidden">
            <div className="w-full p-4">
                <ReturnButton function={() => { component === 'initial' ? navigate("/", { replace: true }) : setComponent('initial') }} />
            </div>
            <div className="w-full h-full">
                {handleComponent()}
            </div>
            <div className="hidden md:w-full h-full">
                <SideRight />
            </div>
        </main>
    );
}