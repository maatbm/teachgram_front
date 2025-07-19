import { SideRight, ReturnButton, ConfigInitial, EditProfile } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type component = 'initial' | 'accountConfig' | 'editProfile';

export function ConfigPage() {
    const navigate = useNavigate();
    const [component, setComponent] = useState<component>('initial');

    function handleComponent() {
        switch (component) {
            case ('initial'): return (<ConfigInitial setAccountConfig={() => setComponent('accountConfig')} setEditprofile={() => setComponent('editProfile')} />);
            case ('accountConfig'): return ("ACCOUNT CONFIG");
            case ('editProfile'): return (<EditProfile />);
        }
    }

    return (
        <main className="w-full h-full grid grid-cols-[5%_1fr_18%] overflow-hidden">
            <div className="w-full p-4">
                <ReturnButton function={() => { component === 'initial' ? navigate("/", { replace: true }) : setComponent('initial') }} />
            </div>
            <div className="w-full h-full">
                {handleComponent()}
            </div>
            <div className="w-full h-full">
                <SideRight />
            </div>
        </main>
    );
}