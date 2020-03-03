import * as axios from "axios";
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
    getUsers(pageSize,pageNumber){
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`)
            .then(response => {
            return response.data
        })
    },
    getUsersTerm(pageSize,text){
        return instance.get(`users?count=${pageSize}&page=1&term=${text}`)
            .then(response => {
                return response.data
            })
    }
}

export const ProfileAPI = {
    getProfile(userId){
        return instance.get(`profile/` + userId)
    },
    getStatus(userId){
        return instance.get(`/profile/status/` + userId);
    },
    updateStatus(newStatus){
        return instance.put(`/profile/status`,{status: newStatus})
    },
    updateProfile(profile){
        return instance.put(`/profile`,profile)
    },
    uploadPhoto(photos) {
        const formData = new FormData();
        formData.append("image",photos);
        return instance.put(`profile/photo`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })

    }

}

export const FollowAPI = {
    followUser(id){
        return instance.post(`follow/${id}`,{})
    },
    unfollowUser(id){
        return instance.delete(`follow/${id}`, {})
    }
}

export const meAPI = {
    me(){
        return instance.get(`auth/me`)
    },
    login(email,password,rememberMe = false,captcha = null){
        return instance.post(`auth/login`,{email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
    }
}

export const DialogsAPI = {
    startChatting(userId){
        return instance.put(`dialogs/${userId}`)
    },
    getAllDialogs(){
        return instance.get(`dialogs`)
    },
    getListMessagesWithFriend(userId ){
        return instance.get(`dialogs/${userId}/messages`)
    },
    sendMessageToFriend(userId,newMessage){
        return instance.post(`dialogs/${userId}/messages`,{body: newMessage})
    },
    isViewedYourMessage(messageId){
        return instance.get(`dialogs/messages/${messageId}/viewed`)
    },
    messageInSpam(messageId){
        return instance.post(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId){
        return instance.delete(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId){
        return instance.put(`dialogs/messages/${messageId}/restore`)
    },
    returnMessageThanDate(userId,date){
        return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    listNewMessage(){
        return instance.get(`dialogs/messages/new/count`)
    }
}