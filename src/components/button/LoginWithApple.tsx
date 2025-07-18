import appleIcon from "assets/components/LoginWithApple/appleLogo.png";

export function LoginWithApple() {
    return (
        <div
            className="w-full flex justify-center items-center gap-6 p-2 rounded-xl shadow mb-6 cursor-pointer hover-background-gray"
            role="button"
            onClick={() => { console.log('Login with Apple clicked') }}
        >
            <img src={appleIcon} alt="Google icon" className="w-[15px] h-[18px]" />
            <span className="text-lg font-semibold text-secondary text-[15px]">Entrar com Apple</span>
        </div>
    );
}