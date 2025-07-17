import { TopImage } from "components";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <main className="w-full h-full flex flex-col items-center p-5">
            <div className="w-3/4 flex justify-center sm:w-1/3">
                <TopImage />
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="font-bold text-2xl">Oops, página não encontrada</h1>
                <Link to="/" className="text-primary font-semibold underline mt-3">Clique aqui para voltar ao início</Link>
            </div>
        </main>
    );
}