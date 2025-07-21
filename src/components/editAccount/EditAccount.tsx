import { useEditProfile } from "hooks";
import { Loading } from "components/loading/Loading";
import { SigninError } from "components/error/SigninError";
import { useAuth } from "contexts/AuthContext";

interface EditAccountProps {
    returnFunction: () => void;
}

export function EditAccount(props: EditAccountProps) {
    const { loading, handleInputChange, updateUser, error } = useEditProfile();
    const { signout, user } = useAuth();

    return (
        <>
            {loading && <Loading fixed={true} />}
            <div className="w-full h-full p-[5%]">
                <h1 className="font-semibold text-[20px] md:text-[25px] text-quaternary">Configurações da conta</h1>
                <form className="w-full md:w-[40%] mt-6 flex flex-col">
                    <label className="text-[15px] md:text-[20px] text-quinary">Nome</label>
                    <input
                        className="border-b border-b-decennary text-[15px] md:text-[20px] outline-0 text-terciary"
                        placeholder={user?.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[15px] md:text-[20px] text-quinary mt-2">Email</label>
                    <input
                        className="border-b border-b-decennary text-[15px] md:text-[20px] outline-0 text-terciary"
                        placeholder={user?.mail}
                        name="mail"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                        type="email"
                    />
                    <label className="text-[15px] md:text-[20px] text-quinary mt-2">Celular</label>
                    <input
                        className="border-b border-b-decennary text-[15px] md:text-[20px] outline-0 text-terciary"
                        placeholder={user?.phone}
                        name="phone"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                    />
                    <label className="text-[15px] md:text-[20px] text-quinary mt-2">Senha</label>
                    <input
                        className="border-b border-b-decennary text-[15px] md:text-[20px] outline-0 text-terciary"
                        placeholder="***************"
                        name="password"
                        onChange={(e) => handleInputChange(e)}
                        autoComplete="off"
                        type="password"
                    />
                    <div className="w-full">
                        {error && <SigninError errorLabel={error} />}
                    </div>
                    <div className="w-full flex gap-3">
                        <button
                            className="w-1/2 md:w-[30%] mt-6 border p-1 border-primary text-[15px] text-primary rounded-md text-center cursor-pointer hover:bg-secondary duration-500 ease-in-out"
                            onClick={props.returnFunction}
                            type="button"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            className="w-1/2 md:w-[30%] mt-6 border p-1 bg-primary border-primary text-[15px] rounded-md text-white text-center cursor-pointer hover:bg-red-800 duration-500 ease-in-out"
                            onClick={() => { updateUser(); signout(); }}
                            type="submit"
                            disabled={loading}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}