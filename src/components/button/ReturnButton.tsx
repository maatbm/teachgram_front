import returnIcon from "assets/components/return/Union.png";

interface ReturnButtonProps {
    function: () => void;
}

export function ReturnButton(props: ReturnButtonProps) {
    return (
        <div className="w-full p-4">
            <img
                src={returnIcon}
                className="w-[25px] h-[25px] cursor-pointer hover:scale-[1.1] duration-300 ease-in-out"
                role="button"
                onClick={props.function}
            />
        </div>
    );
}