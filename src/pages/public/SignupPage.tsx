import { SideImage, TopImage, SignupFirstForm, PrimaryButton, Loading, SigninError, ReturnButton, AuthInput } from "components";
import { Link } from "react-router-dom";
import { useSignup } from "hooks";

export function SignupPage() {
    const {
        user,
        step,
        error,
        loading,
        handleInputChange,
        handleFormSubmit,
        returnToDetails
    } = useSignup();

    function handleFormStep() {
        if (step === 'details') {
            return <SignupFirstForm user={user} onChangeFunction={handleInputChange} />;
        }
        if (step === 'profile') {
            return (
                <AuthInput
                    label="Link"
                    labelColor="text-quinary"
                    type="text"
                    placeholder="Insira seu link"
                    name="profileLink"
                    value={user.profileLink}
                    onChange={handleInputChange}
                />
            );
        }
        return null;
    };

    return (
        <>
            {loading && <Loading fixed={true} />}
            <main className="w-full h-full flex items-center justify-center">
                <div className="w-1/2 h-full flex flex-col">
                    <div className="w-full flex flex-col items-center self-start">
                        <div className="w-full p-3">
                            {step === 'profile' && <ReturnButton function={returnToDetails} />}
                        </div>
                        <div className="w-[50%]">
                            <TopImage />
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        {step === 'profile' && <h2 className="text-quaternary font-semibold text-[20px]">Insira o link da sua foto de perfil</h2>}
                        <div className="w-[45%] mt-2">
                            <form className="w-full mt-1" onSubmit={handleFormSubmit}>
                                {handleFormStep()}
                                {error && <SigninError errorLabel={error} />}
                                <PrimaryButton label={step === 'details' ? "Próximo" : "Salvar"} disabled={loading} />
                            </form>
                            {step === 'details' &&
                                <div className="w-full flex justify-center items-center gap-1 text-[15px] mt-2 mb-4">
                                    <label className="text-[15px] text-quaternary">Já possui conta?</label>
                                    <Link to="/signin" className="text-primary underline font-bold">
                                        Entrar
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full">
                    <SideImage />
                </div>
            </main>
        </>
    );
}