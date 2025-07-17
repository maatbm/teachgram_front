import teachgramLoading from "assets/components/loading/icon.png";
import { useState, useEffect } from "react";

interface LoadingProps {
    fixed?: boolean;
}

export function Loading({ fixed = false }: LoadingProps) {
    const [dots, setDots] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev < 3 ? prev + 1 : 0));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`w-full h-full flex flex-col ${fixed ? "fixed z-10" : null} items-center justify-center bg-primary`}>
            <img
                src={teachgramLoading}
                alt="Loading"
                className="w-1/5 h-1/5 object-contain"
            />
            <span className="text-[25px] text-white font-semibold mt-3">{`Carregando${'.'.repeat(dots)}`}</span>
        </div>
    );
}