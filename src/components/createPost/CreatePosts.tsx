import { Modal } from "components/modal/Modal";
import { useState } from "react";

type component = 'insertImage' | 'insertDescription';

export function CreatePost() {
    const [component, setComponent] = useState<component>('insertImage');
    const [showModal, setShowModal] = useState(true);

    function handleComponent() {
        switch (component) {
            case ('insertImage'): return ("INSERT IMAGE");
            case ('insertDescription'): return ("INSERT DESCRIPTION");
        }
    }

    return (
        <Modal open={showModal}>
            {handleComponent()}
        </Modal>
    )
}