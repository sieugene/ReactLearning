import React from 'react'
import userPhoto from './../../assets/images/userPhoto.png'


//Take current user photo in chat
type CurrentUserPhotoPropsType = {
    currentUserInChat: {
        photos: {
            small: string | null
            large: string | null
        }
    }
}
export const CurrentUserPhoto: React.FC<CurrentUserPhotoPropsType> = (props) => {
    if (!props.currentUserInChat.photos) {
        return <div></div>
    } else if (!props.currentUserInChat.photos.large || !props.currentUserInChat.photos.small) {
        return <img src={userPhoto} alt={''} />
    }
    return (
        <img src={props.currentUserInChat.photos.large} alt={''} />
    )
}
//take Auth user photo
type authUserPhotoType = {
    authUserPhoto: {
        small: string | null
        large: string | null
    }
}
export const AuthUserPhoto: React.FC<authUserPhotoType> = (props: authUserPhotoType) => {
    if (!props.authUserPhoto.small || !props.authUserPhoto.large) {
        return <div></div>;
    }
    if (props.authUserPhoto.small) {
        return <img src={props.authUserPhoto.small} alt={''} />
    } else if (props.authUserPhoto.large) {
        return <img src={props.authUserPhoto.large} alt={''} />
    }
    return (
        <div></div>
    )
}

//Changing the date to a format 10:10
export const formatDate = (date: string): string => {
    const regEx = /[^\d:]/g;
    let format = date.substr(date.length - 12)
    let result = format.replace(regEx, '')
    return result.split(':')[0] + ':' + result.split(':')[1];
}
//confirmation of message deletion

type ThunkDeleteType = (messageId: string, userId: number) => void;
export const confirmmDeletingMessage = (id: string, userId: number, thunkDelete: ThunkDeleteType) => {
    let isConfirm = window.confirm(`delete a message?`);
    if (isConfirm) {
        thunkDelete(id, userId)
    }
}