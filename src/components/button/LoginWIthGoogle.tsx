import googleIcon from "assets/components/LoginWithGoogle/googleLogo.png";

export function LoginWithGoogle() {
    return (
        <div
            className="w-full flex justify-center items-center gap-6 p-2 rounded-xl shadow mb-6 cursor-pointer hover:bg-neutral-200 duration-500 ease-in-out"
            role="button"
            onClick={() => { console.log('Login with Google clicked') }}
        >
            <img src={googleIcon} alt="Google icon" className="w-[17px] h-[18px]" />
            <span className="text-lg font-semibold text-secondary text-[15px]">Entrar com Google</span>
        </div>
    );
}