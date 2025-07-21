import image from "assets/components/configPage/Group 8001.png";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { useDelete } from "hooks";
import { Loading } from "components/loading/Loading";
import { useAuth } from "contexts/AuthContext";
import { ReturnButton } from "components/button/ReturnButton";
import { useNavigate } from "react-router-dom";

interface ConfigInitialProps {
    setAccountConfig: () => void;
    setEditprofile: () => void;
}

export function ConfigInitial(props: ConfigInitialProps) {
    const [showModal, setShowModal] = useState(false);
    const { loading, deleteUser } = useDelete();
    const { signout } = useAuth();
    const navigate = useNavigate()

    return (
        <>
            {loading && <Loading fixed={true} />}
            <div className="w-full h-full">
                <div className="w-full p-4">
                    <ReturnButton function={() => navigate("/", { replace: true })} />
                </div>
                <div className="w-full mt-10 ml-[10%]">
                    <div className="w-full flex gap-7 items-center cursor-pointer " role="button" onClick={props.setAccountConfig}>
                        <span className="font-semibold text-[20px] md:text-[25px]">Configurações da conta</span>
                        <img src={image} alt="Button" className="w-[11px] h-[18px] hover:scale-[1.2] duration-300 ease-in-out" />
                    </div>
                    <div className="w-full flex gap-7 items-center cursor-pointer mt-[3%]" role="button" onClick={props.setEditprofile}>
                        <span className="font-semibold text-[20px] md:text-[25px]">Editar perfil</span>
                        <img src={image} alt="Button" className="w-[11px] h-[18px] hover:scale-[1.2] duration-300 ease-in-out" />
                    </div>
                    <div className="w-full mt-[3%]">
                        <button
                            className="text-primary underline text-[20px] md:text-[25px] cursor-pointer hover:text-red-800 duration-400 ease-in-out"
                            onClick={() => setShowModal(true)}
                        >
                            Excluir conta
                        </button>
                    </div>
                    <div className="w-full mt-[3%]">
                        <button
                            className="text-primary underline text-[20px] md:text-[25px] cursor-pointer hover:text-red-800 duration-400 ease-in-out"
                            onClick={() => signout()}
                        >
                            Sair da conta
                        </button>
                    </div>
                </div>
                <Modal open={showModal}>
                    <div className="w-1/2 bg-white rounded-3xl">
                        <div className="w-full p-7 border-b-2 border-b-nonary">
                            <h1 className="font-semibold text-quaternary text-[25px]">Excluir conta</h1>
                        </div>
                        <div className="w-full p-7">
                            <span>Todos os seus dados serão excluídos.</span>
                        </div>
                        <div className="w-full p-7 flex justify-center gap-7">
                            <button
                                className="w-[30%] p-1 border border-primary rounded-md text-primary text-[15px] text-center cursor-pointer hover:bg-nonary duration-500 ease-in-out"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="w-[30%] border p-1 bg-primary border-primary text-[15px] rounded-md text-white text-center cursor-pointer hover:bg-red-800 duration-500 ease-in-out"
                                onClick={() => { setShowModal(false); deleteUser(); }}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}