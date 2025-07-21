import { SideImage, TopImage, AuthInput, PrimaryButton, SigninWithGoogleOrApple, SigninError, Loading } from "components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { type SignInRequest } from "services/userService/user.types";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function SigninPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [credentials, setCredentials] = useState<SignInRequest>({ mail: "", password: "" });
    const { signin, error, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (credentials.mail && credentials.password) {
            await signin(credentials, rememberMe);
        }
    }

    return (
        <>
            {loading && <Loading fixed={true} />}
            <main className="w-full min-h-full md:h-full flex items-center justify-center p-4 lg:p-0">
                <div className="w-full sm:w-1/2 h-full flex flex-col items-center justify-center">
                    <div className="w-[70%] lg:w-[55%]">
                        <TopImage />
                    </div>
                    <div className="w-full lg:w-[45%] mt-5 lg:mt-20">
                        <h2 className="text-quaternary font-semibold mb-5">Faça seu login</h2>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <AuthInput
                                label="E-mail"
                                labelColor="text-terciary"
                                type="email"
                                placeholder="Digite seu E-mail"
                                required={true}
                                name="mail"
                                value={credentials.mail}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <AuthInput
                                label="Senha"
                                labelColor="text-terciary"
                                type="password"
                                placeholder="Digite sua Senha"
                                required={true}
                                name="password"
                                value={credentials.password}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <div className="w-full flex text-[12px] text-terciary mb-3">
                                <div className="w-1/2 flex gap-3">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 appearance-none border-2 border-primary rounded checkbox-checked cursor-pointer"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label>Lembra senha</label>
                                </div>
                                <div className="w-1/2 flex justify-end items-center">
                                    <Link to="/" className="underline ">
                                        Esqueci minha senha
                                    </Link>
                                </div>
                            </div>
                            {error && <SigninError errorLabel={error} />}
                            <PrimaryButton label={loading ? "Entrando..." : "Entrar"} disabled={loading} />
                        </form>
                        <div className="w-full flex justify-center items-center gap-1 text-[15px] mt-4 mb-4">
                            <label className="text-[15px] text-quaternary">Não possui conta?</label>
                            <Link to="/signup" className="text-primary underline font-bold">
                                Cadastre-se
                            </Link>
                        </div>
                        <SigninWithGoogleOrApple />
                    </div>
                </div>
                <div className="hidden lg:block w-1/2 h-full items-center justify-center">
                    <SideImage />
                </div>
            </main>
        </>
    );
}