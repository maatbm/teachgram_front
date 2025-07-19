import { SideRight, ReturnButton } from "components";
import { useNavigate } from "react-router-dom";
import image from "assets/components/configPage/Group 8001.png";

export function ConfigPage() {
    const navigate = useNavigate();

    return (
        <main className="w-full h-full flex">
            <div className="w-[82%] h-full">
                <div className="w-full p-4">
                    <ReturnButton function={() => navigate("/", { replace: true })} />
                </div>
                <div className="w-full mt-10 ml-[10%]">
                    <div className="w-full flex gap-7 items-center cursor-pointer " role="button">
                        <span className="font-semibold text-[25px]">Configurações da conta</span>
                        <img src={image} alt="Button" className="w-[11px] h-[18px] hover:scale-[1.2] duration-300 ease-in-out" />
                    </div>
                    <div className="w-full flex gap-7 items-center cursor-pointer mt-[3%]" role="button">
                        <span className="font-semibold text-[25px]">Editar perfil</span>
                        <img src={image} alt="Button" className="w-[11px] h-[18px] hover:scale-[1.2] duration-300 ease-in-out" />
                    </div>
                    <div className="w-full mt-[3%]">
                        <button className="text-primary underline text-[25px] cursor-pointer hover:text-red-800 duration-400 ease-in-out">Excluir conta</button>
                    </div>
                </div>
            </div>
            <div className="w-[18%] h-full">
                <SideRight />
            </div>
        </main>
    );
}