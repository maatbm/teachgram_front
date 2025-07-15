import { SideImage, TopImage, AuthInput, PrimaryButton, SigninWithGoogleOrApple } from "components";
import { Link } from "react-router-dom";

export function SigninPage() {
    return (
        <main className="w-full h-full flex items-center justify-center">
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
                <div className="w-[55%]">
                    <TopImage />
                </div>
                <div className="w-[45%] mt-15">
                    <h2 className="text-quaternary font-semibold mb-5">Faça seu login</h2>
                    <form className="w-full">
                        <AuthInput
                            label="E-mail"
                            labelColor="text-terciary"
                            type="email"
                            placeholder="Digite seu E-mail"
                            required={true}
                            onChange={(e) => console.log(e.target.value)}
                        />
                        <AuthInput
                            label="Senha"
                            labelColor="text-terciary"
                            type="password"
                            placeholder="Digite sua Senha"
                            required={true}
                            onChange={(e) => console.log(e.target.value)}
                        />
                        <div className="w-full flex text-[12px] text-terciary">
                            <div className="w-1/2 flex gap-3">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 appearance-none border-2 border-primary rounded checkbox-checked cursor-pointer"
                                />
                                <label>Lembra senha</label>
                            </div>
                            <div className="w-1/2 flex justify-end items-center">
                                <Link to="/" className="underline ">
                                    Esqueci minha senha
                                </Link>
                            </div>
                        </div>
                        <PrimaryButton label="Entrar" />
                    </form>
                    <div className="w-full flex justify-center items-center gap-1 text-[15px] mt-4 mb-4">
                        <label className="text-[15px] text-quaternary">Não possui conta?</label>
                        <Link to="/" className="text-primary underline font-bold">
                            Cadastre-se
                        </Link>
                    </div>
                    <SigninWithGoogleOrApple />
                </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
                <SideImage />
            </div>
        </main>
    );
}