import * as axios from "axios";
//создаем образец, чтобы не дублировать код
let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d4e49910-2fe8-4bea-9f3e-6baf6e969610"
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
    }

}

export const FollowAPI = {
    followUser(id){
        return instance.post(`follow/${id}`,{})
    },
    unfollowUser(id){
        return instance.delete(`follow/${id}`, {})
    },
}

export const meAPI = {
    me(){
        return instance.get(`auth/me`)
    }
}