interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
}

export function PrimaryButton(props: PrimaryButtonProps) {
    return (
        <button
            className="w-full mt-5 bg-primary rounded-xl p-2 font-semibold text-center text-white text-[20px] shadow cursor-pointer hover:bg-red-800 duration-400 ease-in-out"
            onClick={props.onClick}
        >{props.label}</button>
    );
}