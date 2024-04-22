import {GetItemsType, instance, ResponseType} from "./api";
import {profileAPI} from "./profile-API";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get<GetItemsType>(
            `users?page=${currentPage}&count=${pageSize}`
        );
        return response.data;
    },

    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)//.then(res => res.data);
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)//.then(res => res.data);
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId).then(res => res) as Promise<ResponseType>
    },
};