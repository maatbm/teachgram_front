interface SigninErrorProps {
    errorLabel: string;
}

export function SigninError(props: SigninErrorProps) {
    return (
        <div className="w-full flex justify-end items-center gap-2">
            <div className="w-[12px] h-[12px] bg-primary rounded-circle"></div>
            <p className="font-semibold text-[15px] text-primary">{props.errorLabel}</p>
        </div>
    );
}