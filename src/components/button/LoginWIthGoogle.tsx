import googleIcon from "@componentsAssets/LoginWithGoogle/googleLogo.png";

export function LoginWithGoogle() {
    return (
        <div
            className="w-full flex justify-center items-center gap-6 p-4 rounded-xl shadow mb-6 cursor-pointer hover:scale-[1.1] duration-400"
            role="button"
            onClick={() => { console.log('Login with Google clicked') }}
        >
            <img src={googleIcon} alt="Google icon" className="w-[17px] h-[18px]" />
            <span className="text-lg font-semibold">Login with Google</span>
        </div>
    );
}