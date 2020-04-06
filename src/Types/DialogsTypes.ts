import { ContactsType, PhotosType } from "./ProfileTypes"

export type InitialStateType = {
    listDialogs: DialogItemType[];
    messagesWithFriend: {
        items: MessageItemType[],
        totalCount: number
    };
    countNesMessages: number | null;
    currentUserInChat: CurrentUserType | {};
    loading: boolean;
    syncingAllMessages: boolean
    disabledForm: boolean
}
export type DialogItemType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: string | null
        large: string | null
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
    recipientName: string
    viewed: boolean
    deletedBySender: boolean
    deletedByRecipient: boolean
    isSpam: boolean
    distributionId: null
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
