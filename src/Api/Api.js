import * as axios from "axios";
//создаем образец, чтобы не дублировать код
let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "854c2128-c8b3-4384-8ac5-b69b15ea1eff"
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