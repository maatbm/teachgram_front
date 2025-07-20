interface InsertImagePostProps {
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickFunction: () => void;
}

export function InsertImagepost(props: InsertImagePostProps) {
    return (
        <form className="w-full mt-5 flex flex-col justify-center">
            <div className="w-full flex border border-primary rounded-md">
                <div className="w-1/4 p-1 rounded-md bg-primary">
                    <span className="text-white font-semibold text-[15px]">Link da imagem</span>
                </div>
                <input
                    className="w-[75%] outline-0 pl-2 text-[15px] text-septenary"
                    placeholder="Insira aqui a url da imagem"
                    name="photoLink"
                    autoComplete="off"
                    onChange={(e) => props.onChangeFunction(e)}
                />
            </div>
            <button
                className="mt-3 text-primary underline cursor-pointer hover:text-red-800 duration-500 ease-in-out"
                type="submit"
                onClick={() => props.onClickFunction()}
            >Avançar</button>
        </form>
    );
}