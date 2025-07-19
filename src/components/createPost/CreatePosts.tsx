import { Modal } from "components/modal/Modal";
import { useState, useEffect } from "react";
import close from "assets/components/post/Group 8022.png";

type component = 'insertImage' | 'insertDescription';

interface CreatePostprops {
    showModal: boolean;
    close: () => void;
}

export function CreatePost(props: CreatePostprops) {
    const [component, setComponent] = useState<component>('insertImage');

    function handleComponent() {
        switch (component) {
            case ('insertImage'): return ("INSERT IMAGE");
            case ('insertDescription'): return ("INSERT DESCRIPTION");
        }
    }

    return (
        <Modal open={props.showModal}>
            <div className="w-1/3 bg-white p-5 rounded-2xl">
                <div className="w-full flex justify-between items-center">
                    <h1>Criar nova publicação</h1>
                    <img src={close} alt="Close modal" className="w-[17px] h-[17px] hover:scale-[1.2] duration-400 ease-in-out" role="button" onClick={() => props.close()} />
                </div>
            </div>
        </Modal>
    )
}