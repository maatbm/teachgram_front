import closeIcon from "assets/components/post/Group 8022.png";
import { SigninError } from "components";
import type { PostResponse } from "services/postService/post.types";

interface UpdatePostProps {
    closeFunction: () => void;
    post: PostResponse;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePrivacy: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updatePostFunction: () => void;
    error: string;
}

export function Updatepost(props: UpdatePostProps) {
    return (
        <div className="w-full md:w-1/3 h-full md:h-auto bg-white md:rounded-3xl p-7 flex flex-col items-center">
            <div className="w-full">
                <img src={closeIcon} alt="Close button" role="button" onClick={() => props.closeFunction()} className="cursor-pointer hover:scale-[1.1] duration-300 ease-in-out" />
            </div>
            <form className="w-full flex flex-col items-center">
                <div className="w-2/3 flex justify-between">
                    <h1 className="text-[15px] md:text-[25px] font-semibold text-quaternary">Editar publicação</h1>
                    <button
                        className="text-primary text-[15px] font-semibold cursor-pointer underline hover:text-red-800 duration-500 ease-in-out"
                        onClick={() => props.updatePostFunction()}
                    >
                        Salvar
                    </button>
                </div>
                <div className="w-full md:w-1/2 mt-4">
                    <img src={props.post.photoLink} />
                </div>
                <input
                    className="w-full text-[15px] mt-4 text-ellipsis text-septenary outline-0 focus:border-b border-b-primary"
                    placeholder={props.post.title}
                    name="title"
                    autoComplete="off"
                    onChange={(e) => props.handleInputChange(e)}
                />
                <input
                    className="w-full text-[15px] text-ellipsis text-septenary outline-0 focus:border-b border-b-primary mt-3"
                    placeholder={props.post.description}
                    name="description"
                    autoComplete="off"
                    onChange={(e) => props.handleInputChange(e)}
                />
                <div className="w-full mt-3 flex items-center gap-2">
                    <input
                        className="w-4 h-4 appearance-none border-2 border-primary rounded checkbox-checked cursor-pointer"
                        type="checkbox"
                        name="isPrivate"
                        onChange={(e) => props.handlePrivacy(e)}
                    />
                    <span className="text-[15px] text-septenary">Privado</span>
                </div>
            </form>
            {props.error && <SigninError errorLabel={props.error} />}
        </div>
    );
}