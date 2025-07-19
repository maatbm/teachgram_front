import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    buttonFunction: () => void;
}

export function LikeBUtton(props: LikeButtonProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    function handleClick() {
        if (isAnimating) return;
        setIsAnimating(true);
        props.buttonFunction();
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    };

    return (
        <button onClick={handleClick} className="like-button cursor-pointer">
            {isAnimating ? (
                <FaHeart className="text-primary text-[28px] heart-animation" />
            ) : (
                <FaRegHeart className=" text-primary text-[28px]" />
            )}
        </button>
    );
}