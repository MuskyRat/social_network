import {APIResponseType, GetUsersResponseType, instance} from "./api";


export const usersAPI = {
    getUsers (count = 10, page = 1, term = '', friend: boolean | null = null) {
        return instance.get<GetUsersResponseType>('users', {params: {count, page, term, ...(friend === null ? '' : {friend: friend})}}).then(res => res.data);
    },
    getUser (userId: number) {
        return instance.get<boolean>(`follow/${userId}`).then(res => res.data);
    },
    follow (userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
    },
    unfollow (userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data);
    }
};