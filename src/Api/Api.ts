import axios from "axios";
import { ProfileType } from "../Types/ProfileTypes";
//создаем образец, чтобы не дублировать код
let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a6c20467-1a5b-406b-88d2-a8a4879b1b99"
    }
})
//группировка методов
export const UsersAPI = {
    getUsers(pageSize: number, pageNumber: number) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`)
            .then(response => {
                return response.data
            })
    },
    getUsersTerm(pageSize: number, text: string) {
        return instance.get(`users?count=${pageSize}&page=1&term=${text}`)
            .then(response => {
                return response.data
            })
    }
}

export const ProfileAPI = {
    getProfile(userId: string | number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string | number) {
        return instance.get(`/profile/status/` + userId);
    },
    updateStatus(newStatus: string) {
        return instance.put(`/profile/status`, { status: newStatus })
    },
    updateProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
    },
    uploadPhoto(photos: any) {
        const formData = new FormData();
        formData.append("image", photos);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

}

export const FollowAPI = {
    followUser(id: any) {
        return instance.post(`follow/${id}`, {})
    },
    unfollowUser(id: any) {
        return instance.delete(`follow/${id}`, {})
    }
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
type MeResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}

export const meAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}

export const DialogsAPI = {
    startChatting(userId: number) {
        return instance.put(`dialogs/${userId}`)
    },
    getAllDialogs() {
        return instance.get(`dialogs`)
    },
    getListMessagesWithFriend(userId: number) {
        return instance.get(`dialogs/${userId}/messages`)
    },
    sendMessageToFriend(userId: number, newMessage: string) {
        return instance.post(`dialogs/${userId}/messages`, { body: newMessage })
    },
    isViewedYourMessage(messageId: any) {
        return instance.get(`dialogs/messages/${messageId}/viewed`)
    },
    messageInSpam(messageId: any) {
        return instance.post(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId: any) {
        return instance.delete(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId: any) {
        return instance.put(`dialogs/messages/${messageId}/restore`)
    },
    returnMessageThanDate(userId: number, date: string) {
        return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    listNewMessage() {
        return instance.get(`dialogs/messages/new/count`)
    }
}