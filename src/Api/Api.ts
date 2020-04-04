import axios from "axios";
import { ProfileType } from "../Types/ProfileTypes";
import { UserType } from "../Types/UsersTypes";
import { DialogItemType, MessageItemType } from "../Types/DialogsTypes";
//создаем образец, чтобы не дублировать код
let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a6c20467-1a5b-406b-88d2-a8a4879b1b99"
    }
})

type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}
//группировка методов
export const UsersAPI = {
    getUsers(pageSize: number, pageNumber: number) {
        return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${pageNumber}`)
            .then(response => {
                return response.data
            })
    },
    getUsersTerm(pageSize: number, text: string) {
        return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=1&term=${text}`)
            .then(response => {
                return response.data
            })
    }
}

type UpdateProfileRespType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}
type UpdatePhotoRespType = {
    data: {
        photos: {
            small: string,
            large: string
        }
    }
    messages: Array<string>
    resultCode: number
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/` + userId);
    },
    updateStatus(newStatus: string) {
        return instance.put<UpdateProfileRespType>(`/profile/status`, { status: newStatus })
    },
    updateProfile(profile: ProfileType) {
        return instance.put<UpdateProfileRespType>(`/profile`, profile)
    },
    uploadPhoto(photos: any) {
        const formData = new FormData();
        formData.append("image", photos);
        return instance.put<UpdatePhotoRespType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

}

export const FollowAPI = {
    followUser(id: number) {
        return instance.post<boolean>(`follow/${id}`, {})
    },
    unfollowUser(id: number) {
        return instance.delete<boolean>(`follow/${id}`, {})
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
type LoginResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>,
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}

export const meAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
    }
}
type GetCaptchaRespType = {
    url: string
}
export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaRespType>(`security/get-captcha-url`)
    }
}
type GetListMessagesWithFriendRespType = {
    items: MessageItemType[],
    totalCount: number
}
type SendMessageRespType = {
    data: {
        message: MessageItemType[]
    }
    messages: Array<string>
    resultCode: number
}

export const DialogsAPI = {
    startChatting(userId: number) {
        return instance.put(`dialogs/${userId}`)
    },
    getAllDialogs() {
        return instance.get<DialogItemType[]>(`dialogs`)
    },
    getListMessagesWithFriend(userId: number) {
        return instance.get<GetListMessagesWithFriendRespType>(`dialogs/${userId}/messages`)
    },
    sendMessageToFriend(userId: number, newMessage: string) {
        return instance.post<SendMessageRespType>(`dialogs/${userId}/messages`, { body: newMessage })
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
        return instance.get<MessageItemType[]>(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    listNewMessage() {
        return instance.get(`dialogs/messages/new/count`)
    }
}