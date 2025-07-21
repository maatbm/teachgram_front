import imageIcon from "assets/components/post/symbole-d-image-grise.png";

interface InsertDescriptionProps {
    srcImage: string | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePrivacity: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createPostFunction: () => void;
}

export function InsertDescription(props: InsertDescriptionProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <img src={props.srcImage ? props.srcImage : imageIcon} alt="Preview image" className=" my-4 w-[50%] md:w-[40%]" />
            <form className="w-full mt-4 flex flex-col items-center">
                <input
                    className="w-full text-[15px] text-ellipsis text-septenary outline-0 focus:border-b border-b-primary"
                    placeholder="Escreva um título..."
                    name="title"
                    autoComplete="off"
                    onChange={(e) => props.handleInputChange(e)}
                />
                <input
                    className="w-full text-[15px] text-ellipsis text-septenary outline-0 focus:border-b border-b-primary mt-3"
                    placeholder="Escreva uma legenda..."
                    name="description"
                    autoComplete="off"
                    onChange={(e) => props.handleInputChange(e)}
                />
                <div className="w-full mt-3 flex items-center gap-2">
                    <input
                        className="w-4 h-4 appearance-none border-2 border-primary rounded checkbox-checked cursor-pointer"
                        type="checkbox"
                        name="isPrivate"
                        onChange={(e) => props.handlePrivacity(e)}
                    />
                    <span className="text-[15px] text-septenary">Privado</span>
                </div>
                <button
                    className="mt-3 text-primary underline cursor-pointer hover:text-red-800 duration-500 ease-in-out"
                    onClick={() => props.createPostFunction()}
                >Compartilhar</button>
            </form>
        </div>
    );
}