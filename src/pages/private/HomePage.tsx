import { HomeSideMenu } from "components";
import { useAuth } from "contexts/AuthContext";

export function HomePage() {
    const { user } = useAuth();

    return (
        <main className="w-full h-full flex">
            <div className="w-[20%] h-full">
                <HomeSideMenu profilePicture={user?.profileLink} />
            </div>
            <div className="w-[80%] h-full"></div>
        </main>
    );
}