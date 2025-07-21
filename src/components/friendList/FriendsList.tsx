import { useState, useEffect, useCallback } from "react";
import { UserService } from "services/userService/user.service";
import * as UserTypes from "services/userService/user.types";
import closeIcon from "assets/components/post/Group 8022.png";
import { Loading } from "components/loading/Loading";

interface FriendsListProps {
    closeModal: () => void;
    showProfile: (userId: number) => void;
}

export function FriendsList({ closeModal, showProfile }: FriendsListProps) {
    const [friends, setFriends] = useState<UserTypes.UserResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchFriends = useCallback(async (page: number) => {
        setLoading(true);
        const response = await UserService.getFriends(page - 1, 4);
        if ("users" in response) {
            setFriends(response.users);
            setTotalPages(response.totalPages);
        } else {
            console.error(response.message);
            setFriends([]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchFriends(currentPage);
    }, [currentPage, fetchFriends]);

    const renderPaginationControls = () => {
        if (totalPages <= 1) return null;
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
            <div className="w-fullf lex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center border border-nonary rounded cursor-pointer text-quaternary disabled:opacity-50"
                >
                    &larr;
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`w-8 h-8 flex items-center justify-center border rounded ${currentPage === number
                            ? 'bg-primary text-white border-primary'
                            : 'border-nonary text-quaternary'
                            }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center border cursor-pointer border-nonary rounded text-quaternary disabled:opacity-50"
                >
                    &rarr;
                </button>
            </div>
        );
    };

    return (
        <>
            {loading && <Loading fixed={true} />}
            <div className="w-full h-full md:h-auto md:w-1/3 bg-white p-5 md:rounded-2xl shadow-lg flex flex-col">
                <div className="w-full flex justify-between items-center border-b border-b-nonary pb-3 mb-4">
                    <h1 className="font-semibold text-[28px] text-quaternary">Amigos</h1>
                    <img
                        src={closeIcon}
                        alt="Fechar modal"
                        className="w-[17px] h-[17px] hover:scale-[1.2] duration-400 ease-in-out cursor-pointer"
                        role="button"
                        onClick={closeModal}
                    />
                </div>
                <div className="flex-grow">
                    <ul className="space-y-4">
                        {friends.map(friend => (
                            <li key={friend.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={friend.profileLink} alt={friend.name} className="w-12 h-12 rounded-circle object-cover" />
                                    <div className="ml-4">
                                        <p className="font-bold text-quaternary">{friend.username}</p>
                                        <p className="text-sm text-septenary">{friend.name}</p>
                                    </div>
                                </div>
                                <button
                                    className="bg-primary text-white text-sm font-semibold py-1 cursor-pointer px-4 rounded-lg hover:bg-red-700 duration-300"
                                    onClick={() => showProfile(friend.id)}
                                >
                                    Ver perfil
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {renderPaginationControls()}
            </div>
        </>
    );
}