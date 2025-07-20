export interface SignUpRequest {
    name: string;
    mail: string;
    username: string;
    description: string;
    phone: string;
    password: string;
    profileLink: string;
}

export interface UserResponse {
    id: number;
    name: string;
    mail: string;
    username: string;
    description: string;
    phone: string;
    profileLink: string;
    totalPosts: number;
    totalFriends: number;
    isFriend?: boolean;
}

export interface SignInRequest {
    mail: string;
    password: string;
}

export interface JwtTokenResponse {
    type: string;
    token: string;
    expiration: number;
}

export interface AllNonDeletedUsersResponse {
    users: UserResponse[];
    totalItems: number;
    totalPages: number;
}

export interface UpdateUserProfileRequest {
    name?: string;
    mail?: string;
    username?: string;
    description?: string;
    phone?: string;
    password?: string;
    profileLink?: string;
}