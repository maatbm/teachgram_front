import { useEditProfile } from "hooks";
import { useNavigate } from "react-router-dom";
import { Loading } from "components/loading/Loading";
import { SigninError } from "components/error/SigninError";
import { useAuth } from "contexts/AuthContext";

export function EditProfile() {
    const { loading, handleInputChange, updateUser, error } = useEditProfile();
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {loading && <Loading fixed={true} />}
            <div className="w-full h-full p-[5%]">
                <h1 className="font-semibold text-[25px] text-quaternary">Editar perfil</h1>
                <img src={user?.profileLink} alt="User image" className="rounded-circle w-[178px] mt-10 border border-octonary" />
                <form className="w-[40%] mt-3 flex flex-col">
                    <label className="text-[20px] text-quinary">Foto de perfil</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-primary text-ellipsis"
                        placeholder={user?.profileLink}
                        name="profileLink"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[20px] text-quinary mt-2">Nome</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder={user?.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[20px] text-quinary mt-2">Nome de usuário</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder={user?.username}
                        name="username"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[20px] text-quinary mt-2">Bio</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder={user?.description}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <div className="w-full">
                        {error && <SigninError errorLabel={error} />}
                    </div>
                    <div className="w-full flex gap-4 mt-6">
                        <button
                            className="w-[30%] p-1 border border-primary rounded-md text-primary text-[15px] text-center cursor-pointer hover:bg-nonary duration-500 ease-in-out"
                            onClick={() => navigate("/config", { replace: true })}
                        >
                            Cancelar
                        </button>
                        <button
                            className="w-[30%] border p-1 bg-primary border-primary text-[15px] rounded-md text-white text-center cursor-pointer hover:bg-red-800 duration-500 ease-in-out"
                            onClick={() => updateUser()}
                            type="submit"
                            disabled={loading}
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}