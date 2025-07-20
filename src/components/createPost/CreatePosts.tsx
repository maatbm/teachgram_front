import { Modal } from "components/modal/Modal";
import { useState } from "react";
import close from "assets/components/post/Group 8022.png";
import { InsertImagepost } from "components/insertImagePost/InsertImagePost";
import { useCreatePost } from "hooks";
import { Loading } from "components/loading/Loading";
import { PreviewImage } from "components/previewImage/PreviewImage";

type component = 'insertImage' | 'previewImage' | 'insertDescription';

interface CreatePostProps {
    showModal: boolean;
    close: () => void;
}

export function CreatePost(props: CreatePostProps) {
    const [component, setComponent] = useState<component>('insertImage');
    const { handleInput, loading, post } = useCreatePost();

    function handleComponent() {
        switch (component) {
            case ('insertImage'): return (<InsertImagepost onChangeFunction={(e) => handleInput(e)} onClickFunction={() => setComponent('previewImage')} />);
            case ('previewImage'): return (<PreviewImage image={post.photoLink} next={() => setComponent('insertDescription')} />);
            case ('insertDescription'): return ("INSERT DESCRIPTION");
        }
    }

    return (
        <Modal open={props.showModal}>
            {loading && <Loading fixed={true} />}
            <div className="w-1/2 bg-white p-5 rounded-2xl">
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-semibold text-[25px] text-quaternary">Criar nova publicação</h1>
                    <img src={close} alt="Close modal" className="w-[17px] h-[17px] hover:scale-[1.2] duration-400 ease-in-out cursor-pointer" role="button" onClick={() => props.close()} />
                </div>
                <div>
                    {handleComponent()}
                </div>
            </div>
        </Modal>
    )
}