import image from "assets/components/feed/Group 8100.png";
import type { PostResponse } from "services/postService/post.types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LikeBUtton } from "../button/LikeButton";
import { useAuth } from "contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Modal } from "components/modal/Modal";
import { Updatepost } from "components/updatePost/UpdatePost";
import { useUpdatePost } from "hooks/useUpdatePost";
import { Loading } from "components/loading/Loading";

interface PostComponentProps {
    post: PostResponse;
    likeFunction: (postId: number) => void;
    showProfile: (userId: number) => void;
}

export function PostComponent(props: PostComponentProps) {
    const { user } = useAuth();
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const toolboxRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContet] = useState<'delete' | 'edit'>();
    const { updatePost, loading, error, handleInput, handlePrivacy, deletePost } = useUpdatePost();

    function toggleToolbox() {
        setIsToolboxOpen(!isToolboxOpen);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (toolboxRef.current && !toolboxRef.current.contains(event.target as Node)) {
                setIsToolboxOpen(false);
            }
        }
        if (isToolboxOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isToolboxOpen]);

    return (
        <>
            {loading && <Loading fixed={true} />}
            <div className="w-full md:w-[75%] shadow-lg p-4 rounded-2xl border border-septenary" key={props.post.id}>
                <div className="w-full flex relative">
                    <div className="w-[74px] cursor-pointer" onClick={() => props.showProfile(props.post.user.id)}>
                        <img src={props.post.user.profileLink} alt="Profile image" className="rounded-circle" />
                    </div>
                    <div className="w-full ml-3 flex flex-col justify-center">
                        <span className="text-[12px] md:text-[25px] text-septenary cursor-pointer" onClick={() => props.showProfile(props.post.user.id)}>{props.post.user.username}</span>
                        <span className="text-[10px] md:text-[20px] text-septenary">{formatDistanceToNow(new Date(props.post.createdAt), { addSuffix: true, locale: ptBR })}</span>
                    </div>
                    {props.post.user.id === user?.id ? <div className="w-[5%] cursor-pointer hover:scale-[1.1] duration-500 ease-in-out">
                        <img src={image} alt="menu" role="button" onClick={() => toggleToolbox()} />
                    </div> : null}
                    {isToolboxOpen && (
                        <div ref={toolboxRef} className="absolute top-0 right-0 mt-2 p-4 bg-white rounded-md shadow-md z-10 border border-senary">
                            <button
                                className="w-full text-primary text-center font-semibold text-[15px] cursor-pointer hover:text-red-800 duration-300 ease-in-out"
                                onClick={() => { setModalContet('edit'); setShowModal(true); }}
                            >
                                Editar
                            </button>
                            <button
                                className="w-full text-primary text-center font-semibold text-[15px] mt-3 cursor-pointer hover:text-red-800 duration-300 ease-in-out"
                                onClick={() => { setModalContet('delete'); setShowModal(true); }}
                            >
                                Excluir
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mt-3">
                    <span className="text-[12px] md:text-[20px] text-septenary">{props.post.description}</span>
                </div>
                {props.post.photoLink &&
                    <div className="w-full flex justify-center mt-3">
                        <img src={props.post.photoLink} alt="Post photo" className="rounded-2xl" />
                    </div>
                }
                {props.post.videoLink &&
                    <div className="w-full flex justify-center mt-3">
                        <video src={props.post.videoLink} className="rounded-2xl w-full" controls />
                    </div>
                }
                <div className="w-full flex gap-5 mt-3 items-center">
                    <LikeBUtton buttonFunction={() => props.likeFunction(props.post.id)} />
                    <span className="text-[10px] md:text-[20px] text-septenary">{props.post.likes} curtidas</span>
                </div>
            </div>
            <Modal open={showModal}>
                {modalContent === 'edit' ?
                    <Updatepost
                        closeFunction={() => setShowModal(false)}
                        post={props.post}
                        handleInputChange={(e) => handleInput(e)}
                        handlePrivacy={(e) => handlePrivacy(e)}
                        updatePostFunction={() => updatePost(props.post.id)}
                        error={error}
                    />
                    :
                    <div className="w-[90%] md:w-1/3 bg-white p-5 rounded-2xl">
                        <h1 className="text-center font-semibold text-[20px] md:text-[25px] text-quaternary">Excluir publicação?</h1>
                        <div className="w-full flex justify-around mt-4">
                            <button
                                className="border border-primary text-primary w-1/3 rounded-md text-[15px] cursor-pointer hover:bg-secondary duration-500 ease-in-out"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="w-1/3 bg-primary rounded-md text-white cursor-pointer hover:bg-red-800 duration-500 ease-in-out"
                                onClick={() => { deletePost(props.post.id); setShowModal(false) }}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                }
            </Modal>
        </>
    );
}