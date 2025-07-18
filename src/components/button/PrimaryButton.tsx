interface PrimaryButtonProps {
    label: string;
    disabled?: boolean;
}

export function PrimaryButton(props: PrimaryButtonProps) {
    return (
        <button
            className="w-full mt-3 bg-primary rounded-xl p-2 font-semibold text-center text-white text-[20px] shadow cursor-pointer hover:bg-red-800 duration-400 ease-in-out click-decrease-size"
            disabled={props.disabled}
            type="submit"
        >{props.label}</button>
    );
}