import teachgramLoading from "assets/loading/teachgramLoading.png";

export function Loading() {
    return (
        <main className="w-screen h-screen flex items-center justify-center bg-primary">
            <img
                src={teachgramLoading}
                alt="Loading"
                className="w-1/3 h-1/3 object-contain"
            />
        </main>
    );
}