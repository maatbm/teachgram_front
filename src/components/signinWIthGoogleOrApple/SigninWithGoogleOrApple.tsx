import { LoginWithGoogle } from "@components/button/LoginWIthGoogle";
import { LoginWithApple } from "@components/button/LoginWithApple";

export function SigninWithGoogleOrApple() {
    return (
        <>
            <fieldset className="w-full border-t-2 border-secondary text-secondary">
                <legend className="text-center px-7 mb-5">Entrar com</legend>
                <LoginWithGoogle />
                <LoginWithApple />
            </fieldset>
        </>
    );
}