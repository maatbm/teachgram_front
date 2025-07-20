import imageIcon from "assets/components/post/symbole-d-image-grise.png";

interface PreviewImageProps {
    image: string | null;
    next: () => void;
}

export function PreviewImage(props: PreviewImageProps) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <img src={props.image ? props.image : imageIcon} alt="Preview image" className="w-[70%] mt-3" />
            <button
                className="mt-3 text-primary underline cursor-pointer hover:text-red-800 duration-500 ease-in-out"
                onClick={() => props.next()}
            >Avançar</button>
        </div>
    );
}