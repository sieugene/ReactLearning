import { ContactsType, PhotosType } from "./ProfileTypes"

export type InitialStateType = {
    listDialogs: DialogItemType[];
    messagesWithFriend: {
        items: MessageItemType[],
        totalCount: number | null
    };
    countNesMessages: number | null;
    currentUserInChat: CurrentUserType | {};
    loading: boolean;
}
export type DialogItemType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: string
        large: string
    }
}
export type MessageItemType = {
    id: string
    body: string
    translatedBody: null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}
export type CurrentUserType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}