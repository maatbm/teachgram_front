interface SigninErrorProps {
    errorLabel: string;
}

export function SigninError(props: SigninErrorProps) {
    return (
        <div className="w-full mt-5 flex justify-end items-center gap-2">
            <div className="w-[4px] h-[4px] bg-primary p-2 rounded-circle"></div>
            <p className="font-semibold text-[15px] text-primary">{props.errorLabel}</p>
        </div>
    );
}