import returnIcon from "assets/components/return/Union.png";

interface ReturnButtonProps {
    function: () => void;
    w?: string
}

export function ReturnButton(props: ReturnButtonProps) {
    return (
        <div className={`${props.w ? props.w: "w-full"}`}>
            <img
                src={returnIcon}
                className="w-[12px] h-[12px] md:w-[25px] md:h-[25px] cursor-pointer hover:scale-[1.1] duration-300 ease-in-out"
                role="button"
                onClick={props.function}
            />
        </div>
    );
}