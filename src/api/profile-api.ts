import {APIResponseType, instance} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type UpdatePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getStatus (userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data);
    },
    // status max length is 300 symbols
    updateStatus (status: string) {
        return instance.put<APIResponseType>('profile/status', {status}).then(res => res.data);
    },
    getProfile (userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data);
    },
    updateProfile (profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile).then(res => res.data);
    },
    updatePhoto (photoFile: File) {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<UpdatePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}