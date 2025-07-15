interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
}

export function PrimaryButton(props: PrimaryButtonProps) {
    <button
        className="w-full mt-5 bg-primary rounded-xl p-3 font-bold text-white text-[20px] shadow cursor-pointer hover:scale-[1.1] duration-400"
        onClick={props.onClick} type="button"
    >{props.label}</button>
}