import { useEditProfile } from "hooks";
import { Loading } from "components/loading/Loading";
import { SigninError } from "components/error/SigninError";
import { useAuth } from "contexts/AuthContext";

export function EditAccount() {
    const { loading, handleInputChange, updateUser, error } = useEditProfile();
    const { signout, user } = useAuth();

    return (
        <>
            {loading && <Loading fixed={true} />}
            <div className="w-full h-full p-[5%]">
                <h1 className="font-semibold text-[25px] text-quaternary">Configurações da conta</h1>
                <form className="w-[40%] mt-6 flex flex-col">
                    <label className="text-[20px] text-quinary">Nome</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder={user?.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[20px] text-quinary mt-2">Email</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder={user?.mail}
                        name="mail"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                        type="email"
                    />
                    <label className="text-[20px] text-quinary mt-2">Celular</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder={user?.phone}
                        name="phone"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[20px] text-quinary mt-2">Senha</label>
                    <input
                        className="border-b border-b-decennary text-[20px] outline-0 text-terciary"
                        placeholder="***************"
                        name="password"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                        type="password"
                    />
                    <div className="w-full">
                        {error && <SigninError errorLabel={error} />}
                    </div>
                    <button
                        className="w-[30%] mt-6 border p-1 bg-primary border-primary text-[15px] rounded-md text-white text-center cursor-pointer hover:bg-red-800 duration-500 ease-in-out"
                        onClick={() => { updateUser(); signout(); }}
                        type="submit"
                        disabled={loading}
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </>
    );
}