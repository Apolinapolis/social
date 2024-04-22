import {photosType, profileType} from "../types/types";
import {instance, ResponseType} from "./api";

type SevePhotoResponseType = {
    photos:photosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(res => res.data);
    },
    savePhoto(photoFile: string) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponseType<SevePhotoResponseType>>(`profile/photo`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(res => res.data)
    },

    saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile/`, profile).then(res => res.data)
    },
};